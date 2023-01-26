import { useEffect, useState } from "react";
import { db, ref, onValue, off } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // const roomRef = db.ref(`rooms/${roomId}`);
    const roomRef = ref(db, `rooms/${roomId}`);

    onValue(roomRef, (snapshot) => {
      const databaseRoom = snapshot.val();

      console.log("databaseRoom", databaseRoom);
      const firebaseQuestions: FirebaseQuestions =
        databaseRoom?.questions ?? {};

      // transformar um Objeto em Array
      const parsedQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      setTitle(databaseRoom?.title);
      setQuestions(parsedQuestion);

      return () => {
        // off('value')
      };
    });
  }, [roomId, user?.id]);

  return { questions, title };
}
