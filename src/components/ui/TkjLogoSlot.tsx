import { cn } from "@/lib/utils";

interface TkjLogoSlotProps {
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "hero";
  surface?: "dark" | "light";
  className?: string;
}

export function TkjLogoSlot({
  logoUrl,
  size = "md",
  surface = "dark",
  className,
}: TkjLogoSlotProps) {
  const src = logoUrl && logoUrl.trim().length > 0 ? logoUrl : "/images/logo-tkj-default.svg";

  const sizeMap = {
    sm: "h-9 w-9 p-1",
    md: "h-11 w-11 p-1",
    lg: "h-20 w-20 p-2",
    hero: "h-24 w-24 sm:h-28 sm:w-28 p-2.5",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center border rounded-[2px] overflow-hidden",
        surface === "dark"
          ? "bg-[#0A0E17] border-[#1E293B]"
          : "bg-[#FFFFFF] border-[#DCE2EC]",
        sizeMap[size],
        className
      )}
    >
      {/* Architectural corner registration */}
      <span
        className="pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-[#3B82F6]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-[#3B82F6]"
        aria-hidden="true"
      />
      <img
        src={src}
        alt="Logo Resmi Teknik Komputer dan Jaringan (TKJ)"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
