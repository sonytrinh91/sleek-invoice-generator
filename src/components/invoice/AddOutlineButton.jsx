import { Plus } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Outline “add” action (e.g. Add address, Add line item): plus icon + label, accent border/text.
 */
export function AddOutlineButton({
  children,
  onClick,
  className,
  iconClassName,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'sleek-inline-action inline-flex cursor-pointer flex-row flex-nowrap items-center gap-1.5 rounded border border-accent px-4 py-3 text-sm font-medium text-accent transition hover:bg-blue-50',
        className,
      )}
      {...rest}
    >
      <Plus className={clsx('size-4 shrink-0', iconClassName)} aria-hidden />
      {children}
    </button>
  )
}
