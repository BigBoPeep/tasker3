import React from "react";
import { useSignal } from "@preact/signals-react";
import { ChevronDown, Square, Check } from "lucide-react";

export default function Dropdown({
  options,
  defaultSelected,
  onChange,
  bgColor = "input",
  checkColor = "red-800",
}) {
  const selected = useSignal(defaultSelected);
  return (
    <div
      className={`relative group/drop rounded-md hover:rounded-b-none bg-${bgColor}
        transition-all transform-gpu duration-300 ease-out cursor-default min-w-0
        z-0 hover:z-50`}
    >
      <div className="flex justify-between items-center px-2 py-1">
        <p className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {options[selected]}
        </p>
        <Square
          className="rotate-90 stroke-transparent group-hover/drop:stroke-black group-hover/drop:rotate-0
            transition-all duration-300 ease-out shrink-0"
        >
          <ChevronDown />
        </Square>
      </div>
      <div
        className={`absolute w-full py-1 scale-y-0 scale-x-90 rounded-b-md bg-${bgColor} 
          group-hover/drop:scale-y-100 group-hover/drop:scale-x-100
          flex flex-col origin-top transition-transform duration-300 ease-out`}
      >
        {Object.entries(options).map(([opt, text]) => {
          return (
            <div
              className={`cursor-pointer py-1 px-2 whitespace-nowrap text-ellipsis overflow-hidden
                  hover:bg-transBG-2 flex justify-between ${opt == selected ? "bg-transBG-1" : ""}`}
              onClick={() => {
                selected.value = opt;
                if (typeof onChange === "function") onChange(opt);
              }}
              key={opt}
            >
              <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                {text}
              </p>
              <Square className="shrink-0">
                {opt == selected && (
                  <Check
                    className={`stroke-5 stroke-${checkColor} origin-center scale-x-125`}
                  />
                )}
              </Square>
            </div>
          );
        })}
      </div>
    </div>
  );
}
