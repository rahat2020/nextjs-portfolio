"use client";
import React, { memo } from "react";

const AppButton = ({
  title = "",
  icon: Icon,
  iconSize = 20,
  className = "",
  callback,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={callback}
      className={`group cursor-pointer relative overflow-hidden rounded-full px-8 py-4 font-semibold transition flex items-center gap-2 ${className}`}
    >
      {Icon && <Icon size={iconSize} className="!text-current z-10" />}
      <span className="relative z-10">{title}</span>
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-white/70 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
      </span>
    </button>
  );
};

export default memo(AppButton);
