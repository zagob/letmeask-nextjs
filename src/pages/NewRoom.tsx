import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { db, ref } from "../services/firebase";
import { useRouter } from "next/router";
import { push } from "firebase/database";
import Link from "next/link";
import Image from "next/image";

export default function NewRoom() {
  const { user } = useAuth();
  const history = useRouter();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return alert("Crie um nome para Sala");
    }

    // const roomRef = database.ref("rooms");
    const roomRef = ref(db, "rooms");

    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    // const firebaseRoom = await roomRef.push({
    //   title: newRoom,
    //   authorId: user?.id,
    // });

    history.push(`/room/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link href="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
