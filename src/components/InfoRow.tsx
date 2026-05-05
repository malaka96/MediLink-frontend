import type { LucideIcon } from "lucide-react";
import Chip from "./Chip";

type Props = {
  icon: LucideIcon;
  text: string;
  chipText: string;
  chipBgColor?: string;
  chipTextColor?: string;
};

export default function InfoRow({
  icon: Icon,
  text,
  chipText,
  chipBgColor,
  chipTextColor,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 border border-gray-200 bg-white rounded-xl shadow-sm">
      
      {/* LEFT: Icon + Text */}
      <div className="flex items-center gap-3 min-w-0">
        <Icon className="w-5 h-5 text-gray-600 shrink-0" />

        {/* Text wraps when needed */}
        <p className="text-sm text-gray-800 break-words">
          {text}
        </p>
      </div>

      {/* RIGHT: Chip */}
      <div className="shrink-0">
        <Chip
          text={chipText}
          bgColor={chipBgColor}
          textColor={chipTextColor}
        />
      </div>
    </div>
  );
}