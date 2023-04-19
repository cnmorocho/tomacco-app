import { Noto_Sans, Numans } from "next/font/google";

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
