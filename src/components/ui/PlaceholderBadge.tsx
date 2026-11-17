import { cn } from "@/lib/utils";

interface PlaceholderBadgeProps {
  variant?: "light" | "dark";
  label?: string;
  className?: string;
}

export function PlaceholderBadge({
  variant = "light",
  label = "DATA CONTOH · KELOLA DI DASHBOARD",
  className,
}: PlaceholderBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.08em] uppercase border rounded-[2px]",
        variant === "dark"
          ? "border-[#1E293B] bg-[#111827] text-[#94A3B8]"
          : "border-[#DCE2EC] bg-[#EBEEF5] text-[#475569]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
      {label}
    </span>
  );
}
