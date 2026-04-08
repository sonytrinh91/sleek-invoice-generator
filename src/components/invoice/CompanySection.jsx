import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'
import { Card, FieldLabel, OutlinedTextarea } from './FormPrimitives.jsx'

const MAX_LOGO_BYTES = 5 * 1024 * 1024

export function CompanySection() {
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const fileInputRef = useRef(null)
  const logoDataUrl = watch('logoDataUrl')

  return (
    <Card>
      <FieldLabel>Company</FieldLabel>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-stretch">
        <div className="flex flex-col gap-2 sm:h-full sm:min-h-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (!file || !file.type.startsWith('image/')) return
              if (file.size > MAX_LOGO_BYTES) {
                setError('logoDataUrl', {
                  type: 'manual',
                  message: 'Logo must be 5 MB or smaller',
                })
                return
              }
              clearErrors('logoDataUrl')
              const reader = new FileReader()
              reader.onload = () => {
                const result = reader.result
                if (typeof result === 'string') {
                  setValue('logoDataUrl', result, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              }
              reader.readAsDataURL(file)
            }}
          />
          <div className="relative flex min-h-24 flex-1 flex-col sm:min-h-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="sleek-logo-add flex h-24 min-h-24 w-full flex-1 cursor-pointer flex-row items-center justify-center overflow-hidden rounded border border-gray-200 bg-neutral-50 text-center text-xs text-gray-500 transition hover:border-gray-300 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-full sm:min-h-0"
              aria-label={logoDataUrl ? 'Change logo' : 'Add logo from your computer'}
            >
              {logoDataUrl ? (
                <img
                  src={logoDataUrl}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="whitespace-nowrap px-2">Add logo</span>
              )}
            </button>
            {logoDataUrl ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  clearErrors('logoDataUrl')
                  setValue('logoDataUrl', '', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
                className="absolute -right-1 -top-1 flex size-7 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                aria-label="Remove logo"
              >
                <X className="size-3.5" strokeWidth={2.5} />
              </button>
            ) : null}
          </div>
          {errors.logoDataUrl?.message ? (
            <p className="max-w-[12rem] text-xs text-red-800" role="alert">
              {errors.logoDataUrl.message}
            </p>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <OutlinedTextarea
            id="company-info"
            label="Company details"
            rows={2}
            placeholder=" "
            textareaClassName="min-h-[3.75rem] py-2 pt-6"
            {...register('companyName')}
          />
        </div>
      </div>
    </Card>
  )
}
