// components/Icon.tsx
import React from "react";
import { Icon as IconifyIcon, IconifyIconProps } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface IconProps extends IconifyIconProps {
  icon: string; // 图标名称，例如 "mdi:home"
  className?: string;
  width?: string | number;
  height?: string | number;
  size?: string | number;
  style?: React.CSSProperties;
  onclick?: () => void;
}

const Icon: React.FC<IconProps> = ({ icon, size, className, onclick }) => {
  className = size
    ? cn(`w-${size} h-${size}`, className)
    : cn("w-6 h-6", className);
  return <IconifyIcon onClick={onclick} className={className} icon={icon} />;
};

export default Icon;
