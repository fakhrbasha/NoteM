import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function ProfileNotes() {
    const { data, isLoading, isError, error } = useQuery({
  queryKey: ['profileNotes'],
  queryFn: GetUserNote,
  select: (data) => data.data.msg,
});
console.log(data);
  return (
    <div>
      Profile
    </div>
  )
}
