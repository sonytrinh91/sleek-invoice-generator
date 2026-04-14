import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DROPDOWN_FIELD_SHELL,
  DROPDOWN_FIELD_SHELL_ERROR,
  DropdownChevronRail,
  fieldInlineErrorClass,
} from './FormPrimitives.jsx'

const inputClassBase =
  'peer w-full min-w-0 border-0 bg-transparent px-3 text-base font-medium text-input-value outline-none ring-0 focus:ring-0 placeholder:font-normal placeholder:text-sm placeholder:text-gray-500'

const inputPadWithLabel = 'pb-1 pt-5'

const inputPadCentered = 'py-3'

const labelHidden = 'sr-only'

/**
 * @param {{ value: string, label: string }[]} options
 * @param {boolean} [searchable=true] When false, shows the same popover list without type-to-filter (plain select).
 */
export function SearchableSelectCombobox({
  id,
  label,
  options,
  value,
  onValueChange,
  toggleAriaLabel = 'Toggle list',
  className,
  searchable = true,
  error,
  onBlur,
}) {
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const hasError = Boolean(error)
  const errId = hasError ? `${id}-error` : undefined

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  )
  const closedLabel = selected?.label ?? ''
  const hasSelection = Boolean(closedLabel)
  const showFloatingLabel = hasSelection && !open

  const filtered = useMemo(() => {
    if (!searchable) return options
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) =>
        o.value.toLowerCase().includes(q) ||
        o.label.toLowerCase().includes(q),
    )
  }, [options, query, searchable])

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

  const openToCurrentIndex = useCallback(() => {
    const i = options.findIndex((o) => o.value === value)
    setHighlight(i >= 0 ? i : 0)
  }, [options, value])

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setOpen(true)
        setQuery('')
        openToCurrentIndex()
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
      <div
        className={clsx(
          'group',
          hasError ? DROPDOWN_FIELD_SHELL_ERROR : DROPDOWN_FIELD_SHELL,
        )}
      >
        <div className="flex min-w-0 items-stretch">
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              id={id}
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete={searchable ? 'list' : 'none'}
              aria-invalid={hasError}
              aria-describedby={errId}
              autoComplete="off"
              spellCheck={false}
              readOnly={!searchable}
              placeholder={
                open
                  ? searchable
                    ? 'Search...'
                    : ' '
                  : hasSelection
                    ? ' '
                    : label
              }
              className={clsx(
                inputClassBase,
                showFloatingLabel ? inputPadWithLabel : inputPadCentered,
                open && searchable ? 'cursor-text' : 'cursor-pointer',
              )}
              value={open && searchable ? query : closedLabel}
              onChange={
                searchable
                  ? (e) => {
                      setQuery(e.target.value)
                      setOpen(true)
                      setHighlight(0)
                    }
                  : undefined
              }
              onFocus={() => {
                setOpen(true)
                setQuery('')
                openToCurrentIndex()
              }}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
            />
            <label
              htmlFor={id}
              className={clsx(
                'pointer-events-none absolute left-3 z-[1] origin-[0] top-2 translate-y-0 text-xs transition-opacity duration-200 ease-out',
                hasError
                  ? 'text-red-800 peer-focus:text-red-800'
                  : 'text-gray-500 peer-focus:text-accent',
                !showFloatingLabel && labelHidden,
              )}
            >
              {label}
            </label>
          </div>
          <DropdownChevronRail>
            <button
              type="button"
              tabIndex={-1}
              aria-label={toggleAriaLabel}
              className={clsx(
                'flex h-full cursor-pointer items-center px-2.5 group-hover:text-gray-600',
                hasError ? 'text-red-300' : 'text-gray-400',
              )}
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
              <ChevronDown className="size-4 shrink-0" aria-hidden />
            </button>
          </DropdownChevronRail>
        </div>
        {hasError ? (
          <div id={errId} role="alert" className={fieldInlineErrorClass}>
            {error}
          </div>
        ) : null}
      </div>

      {open ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="sleek-listbox absolute z-50 mt-1 max-h-72 min-w-full overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
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
                  idx === activeIdx ? 'bg-ds-highlight' : 'hover:bg-ds-highlight',
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
