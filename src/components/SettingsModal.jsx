import React from "react";
import { format } from "date-fns";
import { createPortal } from "react-dom";
import { THEMES, DATE_FORMATS } from "../App.config";
import Dropdown from "./Dropdown";
import { SquareX } from "lucide-react";

export default function SettingsModal({ open, settings }) {
  return createPortal(
    <div
      className={`absolute inset-0 h-fit w-[min(500px,70dvw)] rounded-md z-50 
      m-auto transition-transform duration-700 ease-out bg-(--color-main) 
      p-3
      ${open.value ? "translate-y-0" : "-translate-y-[100dvh]"}`}
    >
      <div className="flex justify-between items-center">
        Settings
        <button className="p-1" onClick={() => (open.value = false)}>
          <SquareX className="size-5" />
        </button>
      </div>
      <div>
        Theme
        <Dropdown
          options={THEMES}
          defaultSelected={settings.value.theme}
          onChange={(selected) => {
            settings.value = { ...settings.value, theme: selected };
          }}
        />
      </div>
      <div>
        Due Date Format
        <Dropdown
          options={DATE_FORMATS}
          defaultSelected={settings.value.dueFormat}
          onChange={(selected) =>
            (settings.value = { ...settings.value, dueFormat: selected })
          }
        />
      </div>
      <div>
        Created Date Format
        <Dropdown
          options={DATE_FORMATS}
          defaultSelected={settings.value.createdFormat}
          onChange={(selected) =>
            (settings.value = { ...settings.value, createdFormat: selected })
          }
        />
      </div>
    </div>,
    document.getElementById("root"),
  );
}
