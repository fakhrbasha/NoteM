import axios from "axios"
import { NoteApi } from "./noteApi";

const baseURL = "https://note-sigma-black.vercel.app/api/v1/"

export async function getAllNotes() {
  return axios.get(baseURL + "notes/allNotes")
}
export async function addNote({ title, content }) {
  return axios.post(
    baseURL + "notes",
    { title, content },
    {
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    }
  );
}

export async function deleteNote(id) {
  return axios.delete(baseURL + "notes/" + id, {
    headers: {
      token: `3b8ny__${localStorage.getItem("token")}`,
    },
  });
}

// export async function GetUserNote(){
//   return axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
//     headers: {
//       token:`3b8ny__${localStorage.getItem("token")}`,  
//     },
//   })
// }

export async function getNoteApi() {
  try {
    const res = await NoteApi.get("", {
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    });
    return res.data; 
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { notes: [] };
    }
    throw err; 
  }
}

export async function DeleteNote(id) {
  return NoteApi.delete(`/${id}`, {
    headers: {
      token: `3b8ny__${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
export async function updateNote(id, data) {
  return NoteApi.put(`/${id}`, data, {
    headers: {
      token: `3b8ny__${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}