"use client";

import { IconType } from "react-icons";

export const ButtonWIcon = ({
  icon: Icon,
  label,
  callback,
  className,
}: {
  icon: IconType;
  label: string;
  callback?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`flex justify-start items-center space-x-4 hover:scale-105 h-full w-full hover:rounded-lg hover:border-[1px] hover:border-gray-500 p-2 ${className}`}
      onClick={() => {
        callback && callback();
      }}
    >
      <Icon className="text-[24px]" />
      <p>{label}</p>
    </button>
  );
};
