import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const REPORT_DIR = path.join(process.cwd(), '.sisyphus', 'evidence');
const REPORT_FILE = path.join(REPORT_DIR, 'accessibility-report.md');

// Ensure report directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Helper to append to report
const appendReport = (text: string) => {
  try {
    fs.appendFileSync(REPORT_FILE, text);
  } catch (err) {
    console.error('Failed to write to report file:', err);
  }
};

// Initialize report file
test.beforeAll(async () => {
  // Only write header if file is empty or new run
  // But since tests run in parallel/workers, we need to be careful.
  // We'll just append.
  if (!fs.existsSync(REPORT_FILE)) {
     fs.writeFileSync(REPORT_FILE, '# Accessibility Audit Report\n\n');
     appendReport(`Date: ${new Date().toLocaleString()}\n\n`);
  }
});

async function runAxe(page: any, contextName: string) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const violations = accessibilityScanResults.violations;
  
  let reportContent = `## Context: ${contextName}\n`;
  reportContent += `URL: ${page.url()}\n`;
  reportContent += `Violations: ${violations.length}\n\n`;

  if (violations.length > 0) {
    reportContent += '| ID | Impact | Description | Help URL |\n';
    reportContent += '|---|---|---|---|\n';
    violations.forEach((violation: any) => {
      reportContent += `| ${violation.id} | ${violation.impact} | ${violation.description} | [Link](${violation.helpUrl}) |\n`;
    });
    reportContent += '\n';
    
    // Detailed nodes
    reportContent += '<details><summary>Detailed Nodes</summary>\n\n';
    violations.forEach((violation: any) => {
      reportContent += `### ${violation.id}\n`;
      violation.nodes.forEach((node: any) => {
         reportContent += `- Target: \`${node.target}\`\n`;
         reportContent += `  - Failure Summary: ${node.failureSummary}\n`;
      });
    });
    reportContent += '</details>\n\n';
  } else {
    reportContent += '✅ No violations found.\n\n';
  }

  appendReport(reportContent);

  return violations;
}

test('accessibility check - home (default/dark)', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Inject axe-core and run
  await runAxe(page, 'Home Page (Default Theme)');
});

test('accessibility check - home (light)', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Toggle theme
  // We need to wait for the button to be interactive
  const themeToggle = page.locator('button[aria-label*="Switch to"]');
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
    // Allow transition
    await page.waitForTimeout(1000); 
    await runAxe(page, 'Home Page (Light Theme)');
  } else {
    console.warn('Theme toggle button not found');
  }
});

test('accessibility check - resume', async ({ page }) => {
  await page.goto('/resume');
  await page.waitForLoadState('networkidle');
  await runAxe(page, 'Resume Page');
});

test('keyboard navigation - focus visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    appendReport(`## Keyboard Navigation Check\n`);

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if body has skip link as first tabbable
    // Usually skip links are the first tabbable element
    const focused1 = await page.evaluate(() => document.activeElement?.className);
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    
    appendReport(`Initial focus: \`${focusedTag}.${focused1}\`\n\n`);

    const skipLink = page.locator('.skip-link');
    if (await skipLink.count() > 0) {
        appendReport(`- ✅ Skip link found in DOM\n`);
        
        // Check if it is focused
        const isSkipLinkFocused = await page.evaluate(() => {
             return document.activeElement?.classList.contains('skip-link');
        });
        
        if (isSkipLinkFocused) {
            appendReport(`- ✅ Skip link receives focus first\n`);
        } else {
            appendReport(`- ⚠️ Skip link did NOT receive focus first (check tab order)\n`);
        }
    } else {
        appendReport(`- ❌ Skip link NOT found\n`);
    }

    // Verify focus styles are applied (visual regression or computed style check)
    // This is hard to automate perfectly without visual snapshots, but we can check if outline is present on focused element
    const outlineStyle = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
            outlineStyle: style.outlineStyle,
            boxShadow: style.boxShadow,
            borderColor: style.borderColor
        };
    });
    
    appendReport(`Focus styles detected: ${JSON.stringify(outlineStyle)}\n\n`);
});
