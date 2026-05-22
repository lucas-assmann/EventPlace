import type { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import axios from 'axios'

interface ApiError {
  field: string
  message: string
}

export function handleApiError<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>
) {
  if (axios.isAxiosError(err) && err.response?.data) {
    const errors: ApiError[] = err.response.data.errors ?? [err.response.data]

    errors.forEach(({ field, message }) => {
      setError(field as Path<T>, { type: 'manual', message })
    })
  }
}