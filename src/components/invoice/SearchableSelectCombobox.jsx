import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const shellClass =
  'overflow-hidden rounded border border-gray-200 hover:bg-gray-50 bg-white transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/25'

const inputClassBase =
  'peer w-full min-w-0 border-0 bg-transparent px-3 text-base font-medium text-input-value outline-none ring-0 focus:ring-0 placeholder:font-normal placeholder:text-sm placeholder:text-gray-500'

const inputPadWithLabel = 'pb-1 pt-5'

const inputPadCentered = 'py-3'

const labelFloated =
  'pointer-events-none absolute left-3 z-[1] origin-[0] top-2 translate-y-0 text-xs text-gray-500 transition-opacity duration-200 ease-out peer-focus:text-accent'

const labelHidden = 'sr-only'

/**
 * @param {{ value: string, label: string }[]} options
 */
export function SearchableSelectCombobox({
  id,
  label,
  options,
  value,
  onValueChange,
  toggleAriaLabel = 'Toggle list',
  className,
}) {
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  )
  const closedLabel = selected?.label ?? ''
  const hasSelection = Boolean(closedLabel)
  const showFloatingLabel = hasSelection && !open

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) =>
        o.value.toLowerCase().includes(q) ||
        o.label.toLowerCase().includes(q),
    )
  }, [options, query])

  const activeIdx =
    filtered.length === 0
      ? -1
      : Math.min(Math.max(0, highlight), filtered.length - 1)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const commit = useCallback(
    (nextValue) => {
      onValueChange(nextValue)
      setOpen(false)
      setQuery('')
      inputRef.current?.blur()
    },
    [onValueChange],
  )

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setOpen(true)
        setQuery('')
        setHighlight(0)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setQuery('')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (filtered.length === 0) return
      setHighlight((i) => Math.min(i + 1, filtered.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (filtered.length === 0) return
      setHighlight((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault()
      const ai =
        filtered.length === 0
          ? 0
          : Math.min(Math.max(0, highlight), filtered.length - 1)
      commit(filtered[ai].value)
    }
  }

  useEffect(() => {
    if (!open || !listRef.current || activeIdx < 0) return
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx, open, filtered])

  const listboxId = `${id}-listbox`

  return (
    <div ref={rootRef} className={clsx('relative w-full min-w-0', className)}>
      <div className={shellClass}>
        <div className="flex min-w-0 items-stretch">
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              id={id}
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              placeholder={
                open ? 'Search...' : hasSelection ? ' ' : label
              }
              className={clsx(
                inputClassBase,
                showFloatingLabel ? inputPadWithLabel : inputPadCentered,
                open ? 'cursor-text' : 'cursor-pointer',
              )}
              value={open ? query : closedLabel}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
                setHighlight(0)
              }}
              onFocus={() => {
                setOpen(true)
                setQuery('')
                const i = options.findIndex((o) => o.value === value)
                setHighlight(i >= 0 ? i : 0)
              }}
              onKeyDown={onKeyDown}
            />
            <label
              htmlFor={id}
              className={clsx(labelFloated, !showFloatingLabel && labelHidden)}
            >
              {label}
            </label>
          </div>
          <div className="flex shrink-0 items-center my-2 self-stretch border-l border-gray-200">
            <button
              type="button"
              tabIndex={-1}
              aria-label={toggleAriaLabel}
              className="flex h-full cursor-pointer items-center px-2.5 text-gray-400 hover:text-gray-600"
              onMouseDown={(e) => {
                e.preventDefault()
                if (open) {
                  setOpen(false)
                  setQuery('')
                } else {
                  inputRef.current?.focus()
                }
              }}
            >
              <ChevronDown className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-72 min-w-full overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">No matches</li>
          ) : (
            filtered.map((o, idx) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                data-idx={idx}
                className={clsx(
                  'cursor-pointer px-3 py-2 text-sm text-fg-strong',
                  idx === activeIdx ? 'bg-blue-50' : 'hover:bg-blue-50',
                )}
                onMouseEnter={() => setHighlight(idx)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  commit(o.value)
                }}
              >
                {o.label}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
