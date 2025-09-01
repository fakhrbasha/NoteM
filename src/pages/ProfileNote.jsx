import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNoteApi } from "../Service/note";
import FeedUI from "./FeedUi";
import AddNote from "./CreateNote";
import Loader from "../components/Loader";

export default function ProfileNote() {
  const queryClient = useQueryClient();

  // ✅ fetch notes with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: getNoteApi,
    select: (data) => data.notes.slice().reverse(),
  });

  if (isLoading) return <Loader />
  if (isError) return <p>Error fetching notes</p>;

  return (
    <div>
      <AddNote onNoteAdded={() => queryClient.invalidateQueries(['notes'])} />

      {data?.length === 0 ? (
        <div className="flex justify-center">
          <h2 className="text-gray-500 text-center py-10 border my-8 w-[500px] rounded-2xl shadow">
            Welcome to your notes! Developed by
            <span className="text-blue-500 font-bold"> Fakhr Basha </span>
          </h2>
        </div>
      ) : (
        <FeedUI person="My" data={data} />
      )}

    </div>
  );
}
