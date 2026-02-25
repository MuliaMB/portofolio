"use client";

import { profile } from "@/content/profile";
import { Container } from "@/components/ui";

/**
 * Resume Page - Print-friendly resume view
 * Accessed at /resume, designed for clean PDF generation
 */
export default function ResumePage() {
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - profile.personal.startYear;

  return (
    <div className="min-h-screen bg-white text-gray-900 print:text-black">
      <Container className="py-8 max-w-4xl">
        {/* Header */}
        <header className="border-b-2 border-gray-200 pb-6 mb-6 print:border-gray-400">
          <h1 className="text-3xl font-bold text-gray-900 print:text-black">
            {profile.personal.name}
          </h1>
          <p className="text-lg text-gray-600 mt-1 print:text-gray-700">
            {profile.personal.title}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 print:text-gray-700">
            <span>{profile.personal.location}</span>
            {profile.personal.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.platform === "email" ? `mailto:${link.url}` : link.url}
                className="text-blue-600 hover:underline print:text-gray-700 print:no-underline"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed print:text-gray-800">
            {profile.personal.bio}
          </p>
          <p className="text-sm text-gray-600 mt-2 print:text-gray-700">
            {yearsExperience}+ years of self-taught journey in technology
          </p>
        </section>

        {/* Work Experience */}
        {profile.workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
              Experience
            </h2>
            <div className="space-y-4">
              {profile.workExperience.map((job, index) => (
                <div key={index} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 print:text-black">
                        {job.role}
                      </h3>
                      <p className="text-gray-600 print:text-gray-700">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 print:text-gray-600 whitespace-nowrap">
                      {job.startDate} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 print:text-gray-800">
                    {job.description}
                  </p>
                  {job.achievements.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside print:text-gray-800">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
            Education
          </h2>
          <div className="space-y-3">
            {profile.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start print:break-inside-avoid">
                <div>
                  <h3 className="font-semibold text-gray-900 print:text-black">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-600 print:text-gray-700">
                    {edu.degree}{edu.field ? ` — ${edu.field}` : ""}
                  </p>
                </div>
                <span className="text-sm text-gray-500 print:text-gray-600">
                  {edu.startYear} – {edu.endYear || "Present"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations */}
        {profile.organizations.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
              Organizations & Leadership
            </h2>
            <div className="space-y-4">
              {profile.organizations.map((org, index) => (
                <div key={index} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 print:text-black">
                        {org.role}
                      </h3>
                      <p className="text-gray-600 print:text-gray-700">{org.name}</p>
                    </div>
                    <span className="text-sm text-gray-500 print:text-gray-600 whitespace-nowrap">
                      {org.startDate} – {org.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 print:text-gray-800">
                    {org.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4 print:gap-2">
            {profile.skillCategories.map((category) => (
              <div key={category.name} className="print:break-inside-avoid">
                <h3 className="font-medium text-gray-900 text-sm print:text-black">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 print:text-gray-700">
                  {category.skills.map((s) => s.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {profile.certificates.slice(0, 8).map((cert) => (
              <div key={cert.id} className="flex justify-between print:break-inside-avoid">
                <span className="text-gray-700 print:text-gray-800">{cert.title}</span>
                <span className="text-gray-500 print:text-gray-600">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Achievements */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
            Key Achievements
          </h2>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 print:text-gray-800">
            {profile.achievements.map((achievement, index) => (
              <li key={index} className="print:break-inside-avoid">
                <strong>{achievement.title}</strong> ({achievement.year}) – {achievement.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Bug Hunting / Security Research */}
        {profile.bugHunting.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-1 print:text-black print:border-gray-400">
              Security Research
            </h2>
            <div className="space-y-2 text-sm">
              {profile.bugHunting.map((bug) => (
                <div key={bug.id} className="flex justify-between items-start print:break-inside-avoid">
                  <div>
                    <span className="font-medium text-gray-900 print:text-black">{bug.title}</span>
                    <span className="text-gray-500 ml-2">({bug.severity.toUpperCase()})</span>
                  </div>
                  <span className="text-gray-500 print:text-gray-600">{bug.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Print Button - Hidden in Print */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Print Resume
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Tip: In print dialog, disable &quot;Headers and footers&quot; for clean output
          </p>
        </div>
      </Container>
    </div>
  );
}
