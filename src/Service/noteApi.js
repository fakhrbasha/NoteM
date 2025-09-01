import axios from "axios";

export const NoteApi = axios.create({baseURL: "https://note-sigma-black.vercel.app/api/v1/notes"})