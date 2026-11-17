import { cn } from "@/lib/utils";

interface BlueprintSchematicProps {
  category: string;
  codeLabel?: string;
  surface?: "dark" | "light";
  className?: string;
}

export function BlueprintSchematic({
  category,
  codeLabel = "SYS // DIAGRAM",
  surface = "dark",
  className,
}: BlueprintSchematicProps) {
  const isDark = surface === "dark";
  const strokePrimary = isDark ? "#3B82F6" : "#2563EB";
  const strokeMuted = isDark ? "#334155" : "#CBD5E1";
  const strokeLight = isDark ? "#F8FAFC" : "#0F172A";
  const bg = isDark ? "#0A0E17" : "#F6F7FA";

  const renderDiagram = () => {
    switch (category) {
      case "Networking":
      case "Infrastruktur":
        return (
          <g>
            {/* Core Router & Dual Switch VLAN Topology */}
            <rect x="170" y="34" width="60" height="28" rx="2" stroke={strokeLight} strokeWidth="1.5" fill={bg} />
            <circle cx="182" cy="48" r="2.5" fill={strokePrimary} />
            <line x1="192" y1="48" x2="218" y2="48" stroke={strokeMuted} strokeWidth="1.2" />
            <path d="M200 62 V94 M200 94 L110 120 M200 94 L290 120" stroke={strokePrimary} strokeWidth="1.5" />
            <rect x="65" y="120" width="90" height="26" rx="2" stroke={strokeMuted} strokeWidth="1.4" fill={bg} />
            <rect x="245" y="120" width="90" height="26" rx="2" stroke={strokeMuted} strokeWidth="1.4" fill={bg} />
            <path d="M90 146 V174 M130 146 V174 M270 146 V174 M310 146 V174" stroke={strokeMuted} strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="90" cy="178" r="5" stroke={strokeLight} strokeWidth="1.3" fill={bg} />
            <circle cx="130" cy="178" r="5" stroke={strokePrimary} strokeWidth="1.5" fill={bg} />
            <circle cx="270" cy="178" r="5" stroke={strokePrimary} strokeWidth="1.5" fill={bg} />
            <circle cx="310" cy="178" r="5" stroke={strokeLight} strokeWidth="1.3" fill={bg} />
            <text x="200" y="22" textAnchor="middle" fill={strokeMuted} fontSize="9" fontFamily="monospace">CORE-ROUTER // IEEE 802.1Q TRUNK</text>
          </g>
        );
      case "Server Administration":
        return (
          <g>
            {/* Server Rack Elevation */}
            <rect x="110" y="32" width="180" height="156" rx="2" stroke={strokeMuted} strokeWidth="1.4" fill={bg} />
            {[46, 82, 118, 154].map((y, idx) => (
              <g key={y}>
                <rect x="122" y={y} width="156" height="24" rx="1" stroke={idx === 1 ? strokePrimary : strokeLight} strokeWidth="1.2" fill={bg} />
                <circle cx="134" cy={y + 12} r="2.5" fill={idx === 1 ? strokePrimary : strokeMuted} />
                <circle cx="144" cy={y + 12} r="2.5" fill={strokeMuted} />
                <line x1="164" y1={y + 12} x2="264" y2={y + 12} stroke={strokeMuted} strokeWidth="1" strokeDasharray="4 3" />
              </g>
            ))}
            <text x="200" y="22" textAnchor="middle" fill={strokeMuted} fontSize="9" fontFamily="monospace">NODE-01 // DEBIAN + NGINX STACK</text>
          </g>
        );
      case "Hardware":
        return (
          <g>
            {/* Motherboard & Bus Schematic */}
            <rect x="85" y="36" width="230" height="148" rx="2" stroke={strokeMuted} strokeWidth="1.4" fill={bg} />
            <rect x="155" y="75" width="70" height="70" rx="2" stroke={strokePrimary} strokeWidth="1.6" fill={bg} />
            <rect x="172" y="92" width="36" height="36" rx="1" stroke={strokeLight} strokeWidth="1.2" fill={bg} />
            {/* Bus Pins */}
            <path d="M120 88 H155 M120 105 H155 M120 122 H155 M225 88 H270 M225 110 H270 M225 132 H270" stroke={strokeMuted} strokeWidth="1.3" />
            <rect x="270" y="64" width="24" height="90" rx="1" stroke={strokeLight} strokeWidth="1.2" fill={bg} />
            <text x="200" y="24" textAnchor="middle" fill={strokeMuted} fontSize="9" fontFamily="monospace">ARCH-BUS // HARDWARE DIAGNOSTICS</text>
          </g>
        );
      case "Cybersecurity":
        return (
          <g>
            {/* Firewall Packet Inspection Layers */}
            <circle cx="200" cy="110" r="64" stroke={strokeMuted} strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="110" r="42" stroke={strokePrimary} strokeWidth="1.5" />
            <path d="M200 76 L228 89 V114 C228 131 216 143 200 148 C184 143 172 131 172 114 V89 L200 76Z" stroke={strokeLight} strokeWidth="1.5" fill={bg} />
            <line x1="70" y1="110" x2="158" y2="110" stroke={strokePrimary} strokeWidth="1.5" />
            <line x1="242" y1="110" x2="330" y2="110" stroke={strokeMuted} strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="200" y="24" textAnchor="middle" fill={strokeMuted} fontSize="9" fontFamily="monospace">SEC-WALL // PACKET FILTERING</text>
          </g>
        );
      default:
        return (
          <g>
            {/* Editorial Geometric Architectural Composition */}
            <rect x="70" y="42" width="120" height="136" stroke={strokeMuted} strokeWidth="1.2" fill={bg} />
            <rect x="210" y="42" width="120" height="62" stroke={strokePrimary} strokeWidth="1.4" fill={bg} />
            <rect x="210" y="116" width="120" height="62" stroke={strokeLight} strokeWidth="1.2" fill={bg} />
            <line x1="70" y1="42" x2="190" y2="178" stroke={strokeMuted} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="270" cy="73" r="14" stroke={strokePrimary} strokeWidth="1.4" fill={bg} />
            <circle cx="270" cy="73" r="4" fill={strokePrimary} />
            <text x="200" y="25" textAnchor="middle" fill={strokeMuted} fontSize="9" fontFamily="monospace">{codeLabel}</text>
          </g>
        );
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden border",
        isDark
          ? "bg-[#0A0E17] border-[#1E293B]"
          : "bg-[#F6F7FA] border-[#DCE2EC]",
        className
      )}
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full object-cover"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${surface}-${category.replace(/\s+/g, "")}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={isDark ? "#151F32" : "#E4E9F2"}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect
          width="400"
          height="220"
          fill={`url(#grid-${surface}-${category.replace(/\s+/g, "")})`}
        />
        {renderDiagram()}
      </svg>
      <div
        className={cn(
          "absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.08em] uppercase",
          isDark ? "text-[#94A3B8]" : "text-[#64748B]"
        )}
      >
        <span>{category}</span>
        <span>TKJ-ARCH // VISUAL</span>
      </div>
    </div>
  );
}
