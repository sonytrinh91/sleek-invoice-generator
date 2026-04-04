import { clsx } from 'clsx'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export const inputClass =
  'w-full rounded border border-gray-200 px-3 py-2 text-sm text-input-value outline-none transition focus:border-accent focus:ring-1 focus:ring-accent'

export const selectClass =
  'w-full appearance-none rounded border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-input-value outline-none transition focus:border-accent focus:ring-1 focus:ring-accent'

const shellBorder = (hasError) =>
  clsx(
    'overflow-hidden rounded border bg-white transition-colors',
    hasError
      ? 'border-red-700 focus-within:border-red-700 focus-within:ring-1 focus-within:ring-red-700/25'
      : 'border-gray-200 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/25',
  )

const floatingLabelPeer = (hasError) =>
  clsx(
    'pointer-events-none absolute left-3 z-[1] origin-[0] transition-all duration-200 ease-out',
    hasError
      ? 'text-red-800 peer-focus:text-red-800'
      : 'text-gray-500 peer-focus:text-accent',
    'top-2 translate-y-0 text-xs',
    'peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm',
    'peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs',
  )

const floatingLabelState = (hasError, floated) =>
  clsx(
    'pointer-events-none absolute left-3 z-[1] origin-[0] transition-all duration-200 ease-out',
    hasError ? 'text-red-800' : 'text-gray-500',
    floated
      ? 'top-2 translate-y-0 text-xs'
      : 'top-[50%] -translate-y-1/2 text-sm',
  )

const peerInputClass =
  'peer w-full border-0 bg-transparent px-3 pb-2 pt-6 text-base font-medium text-input-value outline-none ring-0 placeholder:text-transparent focus:ring-0'

const dateInputClass =
  'date-field-floating relative w-full border-0 bg-transparent px-3 pb-2 pt-6 pr-10 text-base font-medium text-input-value outline-none ring-0 focus:ring-0'

export function OutlinedInput({
  id,
  label,
  error,
  className,
  descriptionId,
  type,
  ...inputProps
}) {
  const hasError = Boolean(error)
  const errId = descriptionId ?? (hasError ? `${id}-error` : undefined)
  const isDate = type === 'date'
  const [focused, setFocused] = useState(false)
  const {
    className: inputInnerClass,
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    value: inputValue,
    ...restInputProps
  } = inputProps
  const val = inputValue
  const stateFloated =
    isDate && (Boolean(val) || focused)

  return (
    <div className={clsx(shellBorder(hasError), className)}>
      <div className="relative">
        {isDate ? (
          <>
            <input
              id={id}
              type="date"
              aria-invalid={hasError}
              aria-describedby={errId}
              {...restInputProps}
              value={inputValue}
              onFocus={(e) => {
                setFocused(true)
                inputOnFocus?.(e)
              }}
              onBlur={(e) => {
                setFocused(false)
                inputOnBlur?.(e)
              }}
              className={clsx(dateInputClass, inputInnerClass)}
            />
            <label
              htmlFor={id}
              className={floatingLabelState(hasError, stateFloated)}
            >
              {label}
            </label>
          </>
        ) : (
          <>
            <input
              id={id}
              type={type ?? 'text'}
              aria-invalid={hasError}
              aria-describedby={errId}
              placeholder=" "
              {...restInputProps}
              value={inputValue}
              onFocus={inputOnFocus}
              onBlur={inputOnBlur}
              className={clsx(peerInputClass, inputInnerClass)}
            />
            <label htmlFor={id} className={floatingLabelPeer(hasError)}>
              {label}
            </label>
          </>
        )}
      </div>
      {hasError ? (
        <div
          id={errId}
          role="alert"
          className="border-t border-red-200 bg-red-50 px-3 py-2 text-xs font-normal leading-snug text-red-800"
        >
          {error}
        </div>
      ) : null}
    </div>
  )
}

export function OutlinedTextarea({
  id,
  label,
  error,
  className,
  rows = 3,
  descriptionId,
  textareaClassName,
  ...textareaProps
}) {
  const hasError = Boolean(error)
  const errId = descriptionId ?? (hasError ? `${id}-error` : undefined)
  const {
    className: textareaInnerClass,
    ...restTextareaProps
  } = textareaProps

  return (
    <div className={clsx(shellBorder(hasError), className)}>
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={errId}
          placeholder=" "
          {...restTextareaProps}
          className={twMerge(
            peerInputClass,
            'min-h-[5.5rem] resize-y pb-3 pt-7 align-top',
            textareaClassName,
            textareaInnerClass,
          )}
        />
        <label htmlFor={id} className={floatingLabelPeer(hasError)}>
          {label}
        </label>
      </div>
      {hasError ? (
        <div
          id={errId}
          role="alert"
          className="border-t border-red-200 bg-red-50 px-3 py-2 text-xs font-normal leading-snug text-red-800"
        >
          {error}
        </div>
      ) : null}
    </div>
  )
}

export function OutlinedSelect({
  id,
  label,
  error,
  className,
  children,
  descriptionId,
  value,
  onFocus,
  onBlur,
  ...selectProps
}) {
  const hasError = Boolean(error)
  const errId = descriptionId ?? (hasError ? `${id}-error` : undefined)
  const [focused, setFocused] = useState(false)
  const floated =
    focused || (value !== undefined && value !== null && String(value) !== '')
  const {
    className: selectInnerClass,
    onFocus: selectOnFocus,
    onBlur: selectOnBlur,
    ...restSelectProps
  } = selectProps

  return (
    <div className={clsx(shellBorder(hasError), className)}>
      <div className="relative pr-10">
        <select
          id={id}
          aria-invalid={hasError}
          aria-describedby={errId}
          {...restSelectProps}
          value={value}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
            selectOnFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
            selectOnBlur?.(e)
          }}
          className={clsx(
            'w-full cursor-pointer appearance-none border-0 bg-transparent px-3 pb-2 pt-6 text-base font-medium text-input-value outline-none ring-0 focus:ring-0',
            selectInnerClass,
          )}
        >
          {children}
        </select>
        <label htmlFor={id} className={floatingLabelState(hasError, floated)}>
          {label}
        </label>
        <SelectChevron
          className={hasError ? 'text-red-300' : undefined}
        />
      </div>
      {hasError ? (
        <div
          id={errId}
          role="alert"
          className="border-t border-red-200 bg-red-50 px-3 py-2 text-xs font-normal leading-snug text-red-800"
        >
          {error}
        </div>
      ) : null}
    </div>
  )
}

/** Plain bordered floating field for address row (border-gray-200) */
export function FloatingField({
  id,
  label,
  error,
  className,
  type = 'text',
  narrow,
  ...inputProps
}) {
  const hasError = Boolean(error)
  const isDate = type === 'date'
  const [focused, setFocused] = useState(false)
  const val = inputProps.value
  const stateFloated = isDate && (Boolean(val) || focused)

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded border bg-white transition-colors',
        hasError
          ? 'border-red-700 focus-within:border-red-700 focus-within:ring-1 focus-within:ring-red-700/25'
          : 'border-gray-200 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/25',
        narrow && 'w-[7.5rem] shrink-0 sm:w-32',
        className,
      )}
    >
      {isDate ? (
        <>
          <input
            id={id}
            type="date"
            {...inputProps}
            onFocus={(e) => {
              setFocused(true)
              inputProps.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              inputProps.onBlur?.(e)
            }}
            className={dateInputClass}
          />
          <label
            htmlFor={id}
            className={floatingLabelState(hasError, stateFloated)}
          >
            {label}
          </label>
        </>
      ) : (
        <>
          <input
            id={id}
            type={type}
            placeholder=" "
            {...inputProps}
            className={peerInputClass}
          />
          <label htmlFor={id} className={floatingLabelPeer(hasError)}>
            {label}
          </label>
        </>
      )}
      {hasError ? (
        <div
          role="alert"
          className="border-t border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800"
        >
          {error}
        </div>
      ) : null}
    </div>
  )
}

export function FloatingSelect({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  children,
}) {
  const [focused, setFocused] = useState(false)
  const floated =
    focused || (value !== undefined && value !== null && String(value) !== '')

  return (
    <div
      className={clsx(
        'flex min-w-0 flex-1 rounded border border-gray-200 bg-white transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/25',
        className,
      )}
    >
      <div className="relative min-w-0 flex-1">
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          className="w-full cursor-pointer appearance-none border-0 bg-transparent px-3 pb-2 pt-6 pr-2 text-sm font-medium text-input-value outline-none ring-0 focus:ring-0"
        >
          {children}
        </select>
        <label
          htmlFor={id}
          className={floatingLabelState(false, floated)}
        >
          {label}
        </label>
      </div>
      <div
        className="flex shrink-0 items-center border-l border-gray-200 px-2.5"
        aria-hidden
      >
        <ChevronDown className="pointer-events-none size-4 text-gray-400" strokeWidth={1.75} />
      </div>
    </div>
  )
}

export function FieldLabel({ children }) {
  return (
    <h2 className="mb-3 text-base font-semibold text-gray-900">{children}</h2>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={clsx('border border-gray-100 bg-white p-5', className)}
    >
      {children}
    </div>
  )
}

export function SelectChevron({ className }) {
  return (
    <ChevronDown
      className={twMerge(
        'pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400',
        className,
      )}
      aria-hidden
    />
  )
}
