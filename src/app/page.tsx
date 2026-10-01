import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHome } from "@/components/illustrated/home";
import { ClosingCTA } from "@/components/illustrated/closing-cta";

export default function Home() {
  return (
    <IllustratedShell closingCTA={<ClosingCTA />}>
      <IllustratedHome />
    </IllustratedShell>
  );
}
