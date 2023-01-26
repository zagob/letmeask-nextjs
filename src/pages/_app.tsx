import "../styles/global.scss";
import "../styles/auth.scss";
import "../styles/button.scss";
import "../styles/room-code.scss";
import "../styles/question.scss";
import "../styles/room.scss";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
