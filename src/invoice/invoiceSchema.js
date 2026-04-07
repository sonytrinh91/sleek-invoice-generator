import { isValid } from 'date-fns'
import { z } from 'zod'
import { parseIssueDate } from './utils.js'

export const lineItemSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .trim()
    .min(1, 'Product or service name is required'),
  qty: z
    .string()
    .refine(
      (v) => {
        const q = parseFloat(v)
        return Number.isFinite(q) && q > 0
      },
      { message: 'Enter a quantity greater than 0' },
    ),
  unitPrice: z
    .string()
    .refine(
      (v) => {
        const p = parseFloat(v)
        return Number.isFinite(p) && p > 0
      },
      { message: 'Enter a unit price greater than 0' },
    ),
})

/** Single source of truth for invoice form validation (required vs optional fields). */
export const invoiceFormSchema = z.object({
  documentType: z.enum([
    'INVOICE',
    'RECEIPT',
    'QUOTE',
    'CREDIT_NOTE',
    'PURCHASE_ORDER',
  ]),
  customerName: z.string().trim().min(1, 'Customer name is required'),
  customerEmail: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please provide a valid email address.'),
  addressVisible: z.boolean(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  postalCode: z.string(),
  country: z.string(),
  invoiceNumber: z.string().trim().min(1, 'Invoice number is required'),
  issueDate: z
    .string()
    .min(1, 'Issue date is required')
    .refine((v) => isValid(parseIssueDate(v)), 'Invalid date'),
  currency: z.string().trim().min(1, 'Currency is required'),
  items: z.array(lineItemSchema).min(1, 'Add at least one line item'),
  notes: z.string(),
  bankDetailsText: z
    .string()
    .trim()
    .min(1, 'Payment details are required'),
  paymentTerms: z.string().trim().min(1, 'Payment terms are required'),
  companyName: z.string(),
  /** Base64 data URL from local image file; empty when no logo. */
  logoDataUrl: z
    .string()
    .refine(
      (v) => v === '' || v.startsWith('data:image/'),
      { message: 'Logo must be an image' },
    ),
})
