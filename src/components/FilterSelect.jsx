import React from "react";
import { effect } from "@preact/signals-react";
import { ChevronDown, Square, Check } from "lucide-react";

const bgColor = "bg-input";
const checkColor = "stroke-red-800";

export default function FilterSelect({
  settings,
  onChange,
  bgColor = "input",
  checkColor = "red-800",
}) {
  let selectedStr = "";

  effect(() => {
    for (const opt in settings.value.filters) {
      if (settings.value.filters[opt].enabled) {
        selectedStr =
          selectedStr +
          (selectedStr.length > 0 ? ", " : "") +
          settings.value.filters[opt].text;
      }
    }
    selectedStr = selectedStr || "None";
    return () => (selectedStr = "");
  });

  return (
    <div
      className={`relative group/multi rounded-md hover:rounded-b-none cursor-default bg-${bgColor}
      transition-all duration-300 ease-out transform-gpu`}
    >
      <div className="flex justify-between items-center px-2 py-1">
        <p className="whitespace-nowrap text-ellipsis overflow-hidden">
          {selectedStr}
        </p>
        <Square
          className="rotate-90 stroke-transparent group-hover/multi:rotate-0 transition-all
            ease-out duration-300 group-hover/multi:stroke-black shrink-0"
        >
          <ChevronDown />
        </Square>
      </div>
      <div
        className={`absolute w-full cursor-pointer scale-y-0 scale-x-90 group-hover/multi:scale-y-100
        group-hover/multi:scale-x-100 transition-transform ease-out duration-300 origin-top 
        py-1 flex flex-col rounded-b-md bg-${bgColor}`}
      >
        {Object.entries(settings.value.filters).map(([opt, optData]) => {
          return (
            <div
              className="flex justify-between px-2 py-1 hover:bg-transBG-2"
              onClick={() => {
                if (typeof onChange === "function") onChange(opt);
              }}
              key={opt}
            >
              <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                {optData.text}
              </p>
              <Square className="">
                <Check
                  className={
                    "stroke-5 origin-center scale-x-125 transition-[stroke] " +
                    (optData.enabled
                      ? `stroke-${checkColor}`
                      : "stroke-transparent")
                  }
                />
              </Square>
            </div>
          );
        })}
      </div>
    </div>
  );

  function handleChange(opt) {}
}
