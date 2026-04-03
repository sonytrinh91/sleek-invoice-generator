import { ACCENT } from '../../invoice/constants.js'

export function InvoiceFooter({ onDownload, customerEmail, onSend }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-end gap-3 border-t border-neutral-200 bg-white px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        onClick={onDownload}
        className="rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
      >
        Download
      </button>
      <button
        type="button"
        onClick={() => onSend(customerEmail)}
        className="rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
        style={{ backgroundColor: ACCENT }}
      >
        Send
      </button>
    </footer>
  )
}
