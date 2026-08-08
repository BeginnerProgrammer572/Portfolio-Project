// Recreated schematic for the ESP32 PID ball balancer — sensor, beam,
// servo, ESP32, and the three status LEDs, in the site's own visual style.
export default function EspDiagram() {
  return (
    <svg viewBox="0 0 640 420" className="h-full w-full" role="img" aria-label="ESP32 PID ball balancer wiring schematic">
      <rect width="640" height="420" fill="#0B1B2B" />
      <line x1="60" y1="150" x2="560" y2="150" stroke="#8B98A5" strokeWidth="4" />
      <circle cx="360" cy="142" r="10" fill="#C97C4A" />
      <circle cx="60" cy="150" r="6" fill="#4FD1C5" />

      <rect x="30" y="90" width="90" height="40" rx="4" fill="none" stroke="#4FD1C5" strokeWidth="1.5" />
      <text x="75" y="114" fill="#F4F1E8" fontSize="12" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">HC-SR04P</text>

      <rect x="530" y="130" width="70" height="60" rx="4" fill="none" stroke="#C97C4A" strokeWidth="1.5" />
      <text x="565" y="164" fill="#F4F1E8" fontSize="12" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">SG90</text>
      <text x="565" y="178" fill="#8B98A5" fontSize="10" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">servo</text>

      <line x1="75" y1="130" x2="75" y2="250" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="565" y1="190" x2="565" y2="250" stroke="#C97C4A" strokeWidth="1.5" strokeDasharray="4 3" />

      <rect x="250" y="250" width="140" height="80" rx="6" fill="none" stroke="#F4F1E8" strokeWidth="1.5" />
      <text x="320" y="285" fill="#F4F1E8" fontSize="14" textAnchor="middle" fontWeight="bold" fontFamily="'JetBrains Mono', monospace">ESP32</text>
      <text x="320" y="302" fill="#8B98A5" fontSize="10" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">DevKit V1</text>

      <line x1="250" y1="270" x2="120" y2="250" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="390" y1="270" x2="530" y2="250" stroke="#C97C4A" strokeWidth="1.5" strokeDasharray="4 3" />

      <circle cx="270" cy="370" r="8" fill="#639922" />
      <circle cx="320" cy="370" r="8" fill="#BA7517" />
      <circle cx="370" cy="370" r="8" fill="#A32D2D" />
      <line x1="280" y1="330" x2="270" y2="362" stroke="#8B98A5" strokeWidth="1" />
      <line x1="320" y1="330" x2="320" y2="362" stroke="#8B98A5" strokeWidth="1" />
      <line x1="360" y1="330" x2="370" y2="362" stroke="#8B98A5" strokeWidth="1" />

      <text x="270" y="395" fill="#8B98A5" fontSize="9" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">settled</text>
      <text x="320" y="395" fill="#8B98A5" fontSize="9" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">tuning</text>
      <text x="370" y="395" fill="#8B98A5" fontSize="9" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">fault</text>
    </svg>
  );
}
