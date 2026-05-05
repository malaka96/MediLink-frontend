type Props = {
  text: string;
  bgColor?: string;     // Tailwind bg color (e.g. "bg-blue-100")
  textColor?: string;   // Tailwind text color (e.g. "text-blue-700")
};

export default function Chip({
  text,
  bgColor = "bg-gray-100",
  textColor = "text-gray-700",
}: Props) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {text}
    </span>
  );
}