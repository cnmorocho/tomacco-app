import { Roboto_Serif, Libre_Baskerville } from "next/font/google";

export const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal"]
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"]
});

