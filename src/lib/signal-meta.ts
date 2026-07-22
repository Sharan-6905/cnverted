import {
  Banknote,
  UserPlus,
  Cpu,
  ArrowLeftRight,
  MessageSquareWarning,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SignalCategory } from "@/lib/types";

export const CATEGORY_META: Record<
  SignalCategory,
  { label: string; icon: LucideIcon }
> = {
  funding: { label: "Funding", icon: Banknote },
  hiring: { label: "Hiring", icon: UserPlus },
  "tech-change": { label: "Tech change", icon: Cpu },
  "exec-move": { label: "Exec move", icon: ArrowLeftRight },
  "pain-signal": { label: "Pain signal", icon: MessageSquareWarning },
  "product-update": { label: "Product update", icon: Sparkles },
};
