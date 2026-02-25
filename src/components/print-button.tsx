"use client";

export function PrintButton() {
  return (
    <div className="mt-8 text-center print:hidden">
      <button
        onClick={() => window.print()}
        className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
      >
        Print Resume
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Use Ctrl+P / Cmd+P for best results
      </p>
    </div>
  );
}
