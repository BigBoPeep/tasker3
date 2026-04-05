import React from "react";
import FilterSelect from "./Multiselect";

export default function TaskControls({ settings }) {
  return (
    <div className="bg-amber-300 p-2 grid grid-cols-3">
      <FilterSelect settings={settings} />
      <FilterSelect settings={settings} />
    </div>
  );
}
