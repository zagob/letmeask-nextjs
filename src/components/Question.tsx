import Image from "next/image";
import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <Image
            width={32}
            height={32}
            src={author?.avatar}
            alt={author?.name}
          />
          <span>{author?.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
