import React from "react";
import { format } from "date-fns";

export default function TaskEntry({ taskID, tasks, onClick }) {
  const task = tasks.value[taskID];

  return (
    <div className="bg-amber-200 py-1 px-2 cursor-pointer" onClick={onClick}>
      <div>{task.title}</div>
      <div>
        {`Due: `}
        <span>{format(task.deadline, "eee MMM do, y '@' h:mmaaa")}</span>
      </div>
      <div className="leading-tight h-10.5 overflow-y-auto">{task.desc}</div>
      <div>
        {`Created: `}
        <span>{format(task.created, "Pp")}</span>
      </div>
    </div>
  );
}
