import { Noto_Sans, Numans, Roboto, Quantico } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
});

export const numans = Numans({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal"],
});

export const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});
