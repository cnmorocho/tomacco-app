import { roboto } from "@/fonts";

export default function NoteList() {
  return (
    <div className="flex flex-col items-center">
      <div className={`${roboto.className} w-96`}>
        <div className="flex justify-center pb-4">
          <p className="font-medium text-zinc-500 text-xl">Current Task</p>
        </div>
        <div className="flex justify-center text-md">
         <p>Study for math (0/1)</p>
        </div>
      </div>
    </div>
  );
}
