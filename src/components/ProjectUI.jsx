import React, { useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import TaskEntry from "./TaskEntry";
import TaskControls from "./TaskControls";
import TaskModal from "./TaskModal";
import Landing from "./Landing";

export default function ProjectUI({
  projects,
  tasks,
  settings,
  selectedProject,
  onAction,
}) {
  const selectedTask = useSignal(null);
  const project = projects.value[selectedProject.value];
  const tasksToShow = project
    ? project.taskIDs.filter((tID) => {
        const task = tasks.value[tID];
        let show = false;
        Object.entries(settings.value.filters).forEach(([filt, val]) => {
          if (val.enabled && task[filt]) show = true;
        });
        return show;
      })
    : [];

  if (!project) return <Landing />;

  return (
    <div className="overflow-auto">
      <div className="bg-red-300 flex flex-col gap-1 p-2">
        <div className="flex justify-between items-center">
          <p>{project.title}</p>

          <button className="p-1.5">
            <Ellipsis className="size-4" />
          </button>
        </div>

        <div>
          {"Due: "}
          <span>{format(project.deadline, "eee MMM do, y '@' h:mmaaa")}</span>
        </div>

        <div className="h-15 leading-tight">{project.desc}</div>

        <div>
          {"Created: "}
          <span>{format(project.created, "Pp")}</span>
        </div>
      </div>
      <div>
        <TaskControls settings={settings} />
        <div className="flex flex-col gap-1 p-1">
          {tasksToShow.map((taskID) => {
            return (
              <TaskEntry
                taskID={taskID}
                tasks={tasks}
                settings={settings}
                key={taskID}
                onClick={() => (selectedTask.value = taskID)}
              />
            );
          })}
        </div>
        <TaskModal
          taskID={selectedTask}
          tasks={tasks}
          onAction={(data) => {
            if (data.actionType === "close" || data.actionType === "delete")
              selectedTask.value = null;
            onAction({ ...data, projectID: project.id });
          }}
        />
      </div>
    </div>
  );
}
