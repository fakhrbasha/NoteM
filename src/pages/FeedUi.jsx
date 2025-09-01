import React, { useState } from "react";
import { updateNote, deleteNote } from "../Service/note";
import { queryClient } from "../App";
import { toast, Bounce } from "react-toastify";
import { Button } from "@heroui/react";

export default function FeedUI({ data, person }) {
  const currentUserId = localStorage.getItem("userId");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null); 
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  async function handleDelete(id) {
    try {
      setDeletingId(id); 
      const res = await deleteNote(id);
      if (res) {
        toast.success("Note Deleted Successfully", { transition: Bounce });
        await queryClient.invalidateQueries(["notes"]);
      }
    } catch (err) {
      toast.error(`Error: ${err.message || err}`, { transition: Bounce });
    } finally {
      setDeletingId(null);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const res = await updateNote(editingNote._id, formData);
      if (res) {
        toast.success("Note Updated Successfully", { transition: Bounce });
        setEditingNote(null);
        setFormData({ title: "", content: "" });
        await queryClient.invalidateQueries(["notes"]);
      }
    } catch (err) {
      toast.error(`Error: ${err.message || err}`, { transition: Bounce });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
          📒 {person} Notes
        </h1>

        {data?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-lg">No notes available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((note) => (
              <div key={note._id} className="bg-white rounded-xl shadow p-6">
                {editingNote?._id === note._id ? (
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Title"
                    />
                    <textarea
                      className="w-full border p-2 rounded"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Content"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        isLoading={isUpdating}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        className="px-3 py-1 bg-gray-300 rounded"
                        onPress={() => setEditingNote(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <p className="text-gray-600 text-sm">
                      {note.content || "No content..."}
                    </p>
                    {note.createdBy === currentUserId && (
                      <div className="mt-4 flex gap-2">
                        <Button
                          onPress={() => {
                            setEditingNote(note);
                            setFormData({
                              title: note.title,
                              content: note.content,
                            });
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded"
                        >
                          Update
                        </Button>
                        <Button
                          onPress={() => handleDelete(note._id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded"
                          isLoading={deletingId === note._id}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
