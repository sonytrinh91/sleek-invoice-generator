import { Card, FieldLabel, inputClass } from './FormPrimitives.jsx'

export function NotesSection({ notes, onChange }) {
  return (
    <Card>
      <FieldLabel>Notes</FieldLabel>
      <textarea
        rows={4}
        placeholder="Enter a note for the customer."
        value={notes}
        onChange={(e) => onChange({ notes: e.target.value })}
        className={inputClass}
      />
    </Card>
  )
}
