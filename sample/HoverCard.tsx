"use client";
import React, { useState } from "react";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  openDelay?: number;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className,
  openDelay = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
};
