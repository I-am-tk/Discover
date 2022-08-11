import React from "react";

type IconSizeType = "sm" | "md" | "lg";

function Icon({
  className = "",
  iconCode,
  size = "md",
}: {
  iconCode: string;
  className?: string;
  size?: IconSizeType;
}) {
  const sizeClasses: Record<IconSizeType, string> = {
    sm: "text-[18px]",
    md: "text-[24px]",
    lg: "text-[36px]",
  };
  return (
    <span className={`material-symbols-rounded block shrink-0 ${sizeClasses[size]} ${className}`}>
      {iconCode}
    </span>
  );
}

export default Icon;
