import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllNotes } from '../Service/note';
import FeedUI from './FeedUi';
import AddNote from './CreateNote';
import Loader from '../components/Loader';

export default function Feed() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes'],
    queryFn: getAllNotes,
    select: (data) => data?.data?.notes?.slice().reverse(), 
    retry: (failureCount, error) => {
      console.log(failureCount, error);
      return failureCount != 4;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="overflow-x-scroll bg-gray-100 p-4">
      <AddNote />
      <FeedUI person={"All"} data={data} />
    </div>
  );
}
