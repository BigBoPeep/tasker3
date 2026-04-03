import React from "react";
import { format } from "date-fns";

export default function TaskEntry({ task }) {
  return (
    <div className="task-entry">
      <div className="task-entry_title">{task.title}</div>
      <div className="task-entry_deadline">
        {`Due: `}
        <span>{format(task.deadline, "eee MMM do, y '@' h:mmaaa")}</span>
      </div>
      <div className="task-entry_desc">{task.desc}</div>
      <div className="task-entry_created">
        {`Created: `}
        <span>{format(task.created, "Pp")}</span>
      </div>
    </div>
  );
}
