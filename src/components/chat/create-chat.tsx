"use client";

import { useRouter } from "next/navigation";

export function CreateChat() {
  let roomIdInput = "";
  const router = useRouter();

  const createRoom = async () => {
    // We will talk about api route shortly
    // const res = await fetch("/api/rooms/create");
    const roomId = "sdfjksdkjfsdkdsdk";

    // const roomId: string = await res.text();
    router.push(`/chats/${roomId}`);
  };

  const joinRoom = async (roomId: string) => {
    router.push(`/chats/${roomId}`);
  };

  return (
    <div>
      <button onClick={createRoom}>Create room</button>
      <div className="flex gap-2">
        <input onChange={({ target }) => (roomIdInput = target.value)} />

        <button onClick={() => joinRoom(roomIdInput)}>Join room</button>
      </div>
    </div>
  );
}
