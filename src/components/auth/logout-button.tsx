"use client";

import { logoutAction } from "@/actions/logout";

type LogoutButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const handleClick = () => {
    logoutAction();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
