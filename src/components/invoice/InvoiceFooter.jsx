export function InvoiceFooter({ onDownload }) {
  return (
    <footer className="z-30 flex h-16 shrink-0 items-center justify-end gap-3 border-t border-neutral-200 bg-white px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        onClick={onDownload}
        className="rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
      >
        Download
      </button>
    </footer>
  )
}
