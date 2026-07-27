import Image from "next/image";

export function BuiltForTeams() {
  return (
    <section id="teams" className="relative aspect-[16/9] w-full">
      <Image
        src="/banners/signal-flow.png"
        alt="One live signal flows from first touch to market strategy — keeping every revenue team aligned with the same real-time buying intent."
        fill
        className="object-cover"
        priority
      />
    </section>
  );
}
