import Chip from "./Chip";

type Props = {
  title: string;
  subtitle: string;
  chipText: string;
  chipBgColor?: string;
  chipTextColor?: string;
  bgColor?: string;
};

export default function HeaderCard({
  title,
  subtitle,
  chipText,
  chipBgColor,
  chipTextColor,
  bgColor = "bg-white",
}: Props) {
  return (
    <div className={`rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm ${bgColor}`}>
      
      {/* Top Row: Title + Chip */}
      <div className="flex items-start justify-between gap-3">
        
        {/* Left: Title + Subtitle */}
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 break-words">
            {subtitle}
          </p>
        </div>

        {/* Right: Chip */}
        <div className="shrink-0">
          <Chip
            text={chipText}
            bgColor={chipBgColor}
            textColor={chipTextColor}
          />
        </div>

      </div>

    </div>
  );
}
