import React from 'react';

export function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Luxury Gold Gradients */}
        <radialGradient id="goldPlate" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="30%" stopColor="#F1C40F" />
          <stop offset="70%" stopColor="#D4AC0D" />
          <stop offset="100%" stopColor="#9A7D0A" />
        </radialGradient>
        
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE893" />
          <stop offset="25%" stopColor="#F1C40F" />
          <stop offset="50%" stopColor="#B7950B" />
          <stop offset="75%" stopColor="#F7DC6F" />
          <stop offset="100%" stopColor="#9A7D0A" />
        </linearGradient>

        <linearGradient id="darkRadial" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E1C1A" />
          <stop offset="100%" stopColor="#080706" />
        </linearGradient>

        <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F1C40F" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="95" fill="url(#darkRadial)" stroke="url(#goldMetallic)" strokeWidth="4" />
      
      {/* Inner Decorative Dotted Ring */}
      <circle cx="100" cy="100" r="88" stroke="url(#goldMetallic)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
      
      {/* Inner Thin Gold Ring */}
      <circle cx="100" cy="100" r="82" stroke="url(#goldMetallic)" strokeWidth="1" opacity="0.6" />

      {/* Decorative Ornaments & Flourishes on Left and Right borders */}
      <circle cx="22" cy="100" r="2.5" fill="url(#goldMetallic)" />
      <circle cx="178" cy="100" r="2.5" fill="url(#goldMetallic)" />

      {/* Luxury Golden Crown */}
      <g id="crown" transform="translate(68, 25)">
        {/* Crown Base */}
        <path d="M 5, 23 L 59, 23 L 54, 27 L 10, 27 Z" fill="url(#goldMetallic)" />
        <rect x="12" y="24" width="4" height="2" rx="1" fill="#FFF" />
        <rect x="22" y="24" width="4" height="2" rx="1" fill="#FFF" />
        <rect x="32" y="24" width="4" height="2" rx="1" fill="#FFF" />
        <rect x="42" y="24" width="4" height="2" rx="1" fill="#FFF" />
        <circle cx="18" cy="25" r="1.5" fill="#E74C3C" />
        <circle cx="38" cy="25" r="1.5" fill="#E74C3C" />
        
        {/* Crown Peaks */}
        <path d="M 5, 23 
                 L 2, 8 
                 L 16, 17 
                 L 32, 2 
                 L 48, 17 
                 L 62, 8 
                 L 59, 23 Z" 
              fill="url(#goldMetallic)" 
              stroke="url(#goldMetallic)" 
              strokeWidth="0.5" 
        />
        
        {/* Crown Jewels (Pearls at top peaks) */}
        <circle cx="2" cy="7" r="2.5" fill="#FFF" stroke="url(#goldMetallic)" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="2" fill="#FFF" stroke="url(#goldMetallic)" strokeWidth="0.5" />
        <circle cx="32" cy="2" r="3.2" fill="#FFF" stroke="url(#goldMetallic)" strokeWidth="0.5" />
        <circle cx="48" cy="16" r="2" fill="#FFF" stroke="url(#goldMetallic)" strokeWidth="0.5" />
        <circle cx="62" cy="7" r="2.5" fill="#FFF" stroke="url(#goldMetallic)" strokeWidth="0.5" />
      </g>

      {/* Stylized Serif Letters PM */}
      <text 
        x="100" 
        y="114" 
        fontFamily="Times New Roman, Georgia, serif" 
        fontSize="52" 
        fontWeight="900" 
        fill="url(#goldMetallic)" 
        textAnchor="middle"
        letterSpacing="-3"
        filter="url(#goldGlow)"
      >
        PM
      </text>

      {/* Underline Flourish under PM */}
      <path d="M 60, 122 Q 100, 128 140, 122 Q 100, 134 60, 122" fill="url(#goldMetallic)" />

      {/* Banner/Plate Background for TEXT */}
      <path d="M 35, 138 L 165, 138 L 157, 154 L 43, 154 Z" fill="#0A0908" stroke="url(#goldMetallic)" strokeWidth="1" />

      {/* PRIME MATKA Text description */}
      <text 
        x="100" 
        y="150" 
        fontFamily="Arial, sans-serif" 
        fontSize="10" 
        fontWeight="900" 
        fill="url(#goldPlate)" 
        textAnchor="middle"
        letterSpacing="2.5"
      >
        PRIME MATKA
      </text>

      {/* Stars decorations below */}
      <g transform="translate(100, 168)" stroke="url(#goldMetallic)" strokeWidth="0.5">
        {/* Five stars */}
        {/* Center Star */}
        <polygon points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1" fill="url(#goldMetallic)" />
        {/* Left Star 1 */}
        <polygon transform="translate(-14, 1) scale(0.8)" points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1" fill="url(#goldMetallic)" />
        {/* Left Star 2 */}
        <polygon transform="translate(-28, 3) scale(0.6)" points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1" fill="url(#goldMetallic)" />
        {/* Right Star 1 */}
        <polygon transform="translate(14, 1) scale(0.8)" points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1" fill="url(#goldMetallic)" />
        {/* Right Star 2 */}
        <polygon transform="translate(28, 3) scale(0.6)" points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1" fill="url(#goldMetallic)" />
      </g>

      {/* Curvy ribbon end lines on the left and right border decoration */}
      <path d="M 37,146 L 27,146 L 31,151 L 39,146" fill="url(#goldMetallic)" />
      <path d="M 163,146 L 173,146 L 169,151 L 161,146" fill="url(#goldMetallic)" />
    </svg>
  );
}
