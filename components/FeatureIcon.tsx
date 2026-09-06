import type { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  variant?: "light" | "dark";
  className?: string;
}

export default function FeatureIcon({
  icon: Icon,
  variant = "light",
  className = "",
}: FeatureIconProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full border ${
        isDark
          ? "border-gold/25 bg-gold/10"
          : "border-gold/20 bg-gold/10"
      } ${className}`.trim()}
    >
      <Icon
        className={`h-5 w-5 ${isDark ? "text-gold-light" : "text-gold"}`}
        aria-hidden
      />
    </div>
  );
}
