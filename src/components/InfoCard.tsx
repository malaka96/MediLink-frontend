import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;          // middle content (big text)
  description: string;    // bottom text
  icon: LucideIcon;
  color?: string;         // tailwind color class (e.g. "text-blue-600")
};

export default function InfoCard({
  title,
  value,
  description,
  icon: Icon,
  color = "text-blue-600",
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 w-full max-w-xs">
      
      {/* Title */}
      <p className="text-sm text-gray-500 font-medium">
        {title}
      </p>

      {/* Middle Row */}
      <div className="flex items-center justify-between mt-2">
        <p className={`text-xl sm:text-2xl font-bold ${color}`}>
          {value}
        </p>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      {/* Bottom Text */}
      <p className="text-xs text-gray-400 mt-2">
        {description}
      </p>

    </div>
  );
}