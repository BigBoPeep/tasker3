import React, { useState } from "react";

export default function Checkbox({
  text,
  checked,
  onChange,
  IconOuter,
  IconInner,
}) {
  return (
    <label
      className="flex items-center gap-1 w-fit cursor-pointer"
      onClick={() => {
        onChange(!checked);
      }}
    >
      {text}
      <IconOuter>
        <IconInner
          className={`origin-center transition-transform transform-gpu
            stroke-3
            ${checked ? "scale-90" : "scale-0"}`}
        />
      </IconOuter>
    </label>
  );
}
