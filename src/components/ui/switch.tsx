"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn("custom-switch", className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: '44px',
        height: '24px',
        borderRadius: '9999px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        padding: '2px',
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="custom-switch-thumb"
        style={{
          display: 'block',
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease',
          pointerEvents: 'none',
        }}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
