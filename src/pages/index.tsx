import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { db, ref, get, child } from "@/services/firebase";
import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    router.push("/NewRoom");
  }

  async function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await get(child(ref(db), `users/${roomCode}`));

    if (!roomRef.exists()) {
      return alert("Room does not exists.");
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <Image
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie sala de Q&amp;A ao-vio</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <Image src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <Image src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
