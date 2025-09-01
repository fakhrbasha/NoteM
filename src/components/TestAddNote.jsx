import React from "react";
import axios from "axios";

export default function TestAddNote() {
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          title: "test note",
          content: "hello world",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZha2hyQGdtYWlsLmNvbSIsImlkIjoiNjhhYzhjMmI3ZTUxZDI2N2VkMWZlMThkIiwiaWF0IjoxNzU2NDc0NDM3LCJleHAiOjE3ODgwMzIwMzd9.F6r4aNeAzzbnpQnyHYUKKZI-CpMl_Sx5XnBP2wkYBaQ`,
          },
        }
      );
      console.log("✅ success:", res.data);
    } catch (err) {
      console.error("❌ error:", err.response?.data || err.message);
    }
  };

  return <button onClick={handleClick}>Test Add Note</button>;
}
