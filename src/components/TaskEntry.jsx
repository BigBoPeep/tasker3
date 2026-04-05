import React from "react";
import { format } from "date-fns";

export default function TaskEntry({ task }) {
  return (
    <div>
      <div>{task.title}</div>
      <div>
        {`Due: `}
        <span>{format(task.deadline, "eee MMM do, y '@' h:mmaaa")}</span>
      </div>
      <div>{task.desc}</div>
      <div>
        {`Created: `}
        <span>{format(task.created, "Pp")}</span>
      </div>
    </div>
  );
}
