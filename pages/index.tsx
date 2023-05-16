import InfoSection from "@/components/InfoSection";
import Navbar from "@/components/Navbar";
import TimerSection from "@/components/TimerSection.tsx";
import TimerApp from "@/components/TimerSection.tsx";

export default function Home() {
  return (
    <main>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TimerSection />
      </div>
    </main>
  );
}
