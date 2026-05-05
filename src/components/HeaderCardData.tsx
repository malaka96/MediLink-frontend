import { ArrowRight } from "lucide-react";
import HeaderCard from "./HeaderCard";

type HeaderCardData = {
  title: string;
  subtitle: string;
  chipText: string;
  chipBgColor?: string;
  chipTextColor?: string;
  bgColor?: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: HeaderCardData[]; // max 5
  onViewAll?: () => void;
};

export default function HeaderCardSection({
  title,
  subtitle,
  items,
  onViewAll,
}: Props) {
  const limitedItems = items.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-5">
        {/* Section Header */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        {/* Header Cards List */}
        <div className="space-y-3">
          {limitedItems.map((item, index) => (
            <HeaderCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              chipText={item.chipText}
              chipBgColor={item.chipBgColor}
              chipTextColor={item.chipTextColor}
              bgColor={item.bgColor}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
