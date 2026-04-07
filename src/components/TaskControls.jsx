import React from "react";
import FilterSelect from "./FilterSelect";
import Dropdown from "./Dropdown";

export default function TaskControls({ settings }) {
  return (
    <div className="bg-amber-300 p-2 grid grid-cols-3 items-center gap-0.5">
      <div>
        Filters
        <FilterSelect
          settings={settings}
          onChange={(opt) => {
            const newFilt = { ...settings.value.filters };
            newFilt[opt].enabled = !newFilt[opt].enabled;
            settings.value = { ...settings.value, filters: newFilt };
          }}
        />
      </div>
      <div>
        Sort By
        <Dropdown
          options={{ deadline: "Deadline", title: "Title", created: "Created" }}
          defaultSelected={settings.value.sortBy}
          onChange={(selected) =>
            (settings.value = { ...settings.value, sortBy: selected })
          }
        />
      </div>
      <div>
        Sort Order
        <Dropdown
          options={{
            descending: "Descending",
            ascending: "Ascending",
            random: "Surprise Me",
          }}
          defaultSelected={settings.value.sortOrder}
          onChange={(selected) =>
            (settings.value = { ...settings.value, sortOrder: selected })
          }
        />
      </div>
    </div>
  );
}
