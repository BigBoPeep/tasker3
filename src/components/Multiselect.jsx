import React from "react";
import { effect } from "@preact/signals-react";
import { ChevronDown, Square, Check } from "lucide-react";

export default function FilterSelect({ settings }) {
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
    return () => (selectedStr = "");
  });

  return (
    <div className="relative group/multi rounded-md hover:rounded-b-none cursor-default bg-amber-100">
      <div className="flex justify-between px-2 py-1">
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
        className="absolute w-full cursor-pointer scale-y-0 scale-x-90 group-hover/multi:scale-y-100
        group-hover/multi:scale-x-100 transition-transform ease-out duration-300 origin-top 
        px-2 py-2 flex flex-col gap-1.5 rounded-b-md bg-amber-100"
      >
        {Object.entries(settings.value.filters).map(([opt, optData]) => {
          return (
            <div
              className="flex justify-between"
              onClick={() => {
                handleChange(opt);
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
                    (optData.enabled ? "stroke-red-800" : "stroke-transparent")
                  }
                />
              </Square>
            </div>
          );
        })}
      </div>
    </div>
  );

  function handleChange(opt) {
    const newFilt = { ...settings.value.filters };
    newFilt[opt].enabled = !newFilt[opt].enabled;
    settings.value = { ...settings.value, filters: newFilt };
  }
}
