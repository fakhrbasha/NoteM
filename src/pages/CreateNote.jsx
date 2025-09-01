import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { addNote } from "../Service/note";
import { queryClient } from "../App";
import { Button } from "@heroui/react";
import { Bounce, toast } from "react-toastify";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notes"]);
      setTitle("");
      setContent("");
      toast.success('Add Note Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    },
    onError: (error) => {
      console.error("Error adding note:", error.message);
            toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    },
    retry: 2,
  });


  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    mutate({ title, content });
  };

  return (
    <div className="bg-white max-w-5xl mx-auto shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">✍️ Add a New Note</h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter note title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write your note here..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <Button
          onPress={handleSubmit}

          isDisabled={isPending}
          className="w-full rounded-lg bg-[#1ebbcc]  text-white font-medium py-2 hover:bg-[#146c75] transition"
        >
          {isPending  ? "Adding..." : "Add Note"}
        </Button>
      </div>
    </div>
  );
}
