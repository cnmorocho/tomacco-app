import Header from "@/components/Header";
import TimerApp from "@/components/TimerApp";

export default function Home() {
  return (
    <main className="h-screen bg-tomato-red w-full flex flex-col items-center">
      <Header />
      <TimerApp />
    </main>
  );
}
