import React from "react";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
  variant?: "official" | "white" | "monochrome";
}

/**
 * Authentic Official WhatsApp Brand Icon
 * Conforms strictly to Meta Brand Resource Center Guidelines:
 * - Solid WhatsApp green (#25D366) chat bubble with authentic lower-left tail
 * - Solid pure white (#FFFFFF) centered telephone handset
 * - NO nested wireframe circles, NO distorted outline rings
 * - "official": Full brand colors (green bubble + white handset)
 * - "white" / "monochrome": Solid silhouette with handset cutout (for colored CTA buttons)
 */
export function WhatsAppIcon({
  className = "w-5 h-5",
  size,
  variant = "official",
}: WhatsAppIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  // Single-color silhouette with handset cutout for CTA buttons
  if (variant === "white" || variant === "monochrome") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.041 4.904A9.837 9.837 0 0 0 12.037 2c-5.458 0-9.901 4.442-9.903 9.902 0 1.746.455 3.45 1.322 4.951L2.05 21.985l5.25-1.377a9.89 9.89 0 0 0 4.732 1.206h.005c5.457 0 9.9-4.443 9.902-9.903a9.843 9.843 0 0 0-2.898-7.006zM15.584 14.16c-.27-.135-1.597-.788-1.844-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.157.18-.315.202-.585.067-.27-.135-1.14-.42-2.173-1.341-.803-.717-1.345-1.601-1.503-1.871-.157-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.067-.135-.607-1.464-.832-2.004-.219-.522-.442-.452-.607-.46l-.518-.01c-.18 0-.472.067-.719.337-.247.27-.945.922-.945 2.247s.968 2.582 1.103 2.762c.135.18 1.905 2.906 4.613 4.078.645.279 1.148.446 1.541.571.651.207 1.243.178 1.711.108.523-.079 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.112-.247-.18-.517-.315z"
        />
      </svg>
    );
  }

  // Official WhatsApp brand badge
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Official WhatsApp Green Chat Bubble */}
      <path
        fill="#25D366"
        fillRule="evenodd"
        d="M19.041 4.904A9.837 9.837 0 0 0 12.037 2c-5.458 0-9.901 4.442-9.903 9.902 0 1.746.455 3.45 1.322 4.951L2.05 21.985l5.25-1.377a9.89 9.89 0 0 0 4.732 1.206h.005c5.457 0 9.9-4.443 9.902-9.903a9.843 9.843 0 0 0-2.898-7.006z"
      />
      {/* Solid Pure White Telephone Handset */}
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M15.584 14.16c-.27-.135-1.597-.788-1.844-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.157.18-.315.202-.585.067-.27-.135-1.14-.42-2.173-1.341-.803-.717-1.345-1.601-1.503-1.871-.157-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.067-.135-.607-1.464-.832-2.004-.219-.522-.442-.452-.607-.46l-.518-.01c-.18 0-.472.067-.719.337-.247.27-.945.922-.945 2.247s.968 2.582 1.103 2.762c.135.18 1.905 2.906 4.613 4.078.645.279 1.148.446 1.541.571.651.207 1.243.178 1.711.108.523-.079 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.112-.247-.18-.517-.315z"
      />
    </svg>
  );
}
