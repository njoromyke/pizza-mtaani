import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import Navbar from "@/components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} font-sans`}>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
