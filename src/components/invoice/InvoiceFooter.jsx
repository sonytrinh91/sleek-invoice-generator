import { clsx } from 'clsx'

export function InvoiceFooter({ onDownload, downloadDisabled }) {
  return (
    <footer className="z-30 flex h-16 shrink-0 items-center justify-end gap-3 border-t border-neutral-200 bg-white px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        disabled={downloadDisabled}
        onClick={onDownload}
        className={clsx(
          'cursor-pointer rounded-md px-5 py-2.5 text-sm font-medium text-white transition',
          'bg-accent hover:bg-accent-hover',
          'disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-accent',
        )}
      >
        Download
      </button>
    </footer>
  )
}
