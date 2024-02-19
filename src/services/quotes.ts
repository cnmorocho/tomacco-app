import axios, { AxiosResponse } from "axios";

export type Quote = {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export async function getRandomMotivationalQuote() {
  const res: AxiosResponse<Quote[]> = await axios.get(`https://api.quotable.io/quotes/random?limit=1&tags=motivational`);
  const quote: string = res.data[0].content;
  return quote;
}
