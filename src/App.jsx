import React, { useState } from "react";
import { Workspace, Project, Task } from "./modules/data";
import { workspaces, projects, tasks, settings } from "./modules/signals";
import { Cog } from "lucide-react";
import WorkspaceUI from "./components/WorkspaceUI";

const testTask1 = new Task({
  title: "Test Task #1",
  desc: "A short description about Test Task #1 and how to complete it",
  deadline: "2026-03-31T22:00",
  completed: false,
});
const testProject1 = new Project({
  title: "Test Project #1",
  desc: "A short description about Test Project #1 and how to complete it",
  deadline: "2026-03-31T22:00",
  completed: false,
  taskIDs: [testTask1.id],
});
const testWorkspace1 = new Workspace({
  title: "Test Workspace #1",
  desc: "A short description about Test Workspace #1",
  projectIDs: [testProject1.id],
});
tasks.value = { [testTask1.id]: testTask1 };
projects.value = { [testProject1.id]: testProject1 };
workspaces.value = { [testWorkspace1.id]: testWorkspace1 };

function App() {
  const [selectedProj, setSelectedProj] = useState(null);

  return (
    <div className="flex flex-col size-full">
      <div className="flex-1 grid grid-cols-[min(400px,40%)_1fr] overflow-hidden">
        <div className="flex flex-col items-center gap-2 p-2 overflow-hidden">
          <img src="/logo.webp" className="w-full" />
          <button>
            <Cog />
            Settings
          </button>
          <WorkspaceUI
            workspaces={workspaces}
            projects={projects}
            onAction={handleAction}
          />
        </div>
        <div>ProjectUI</div>
      </div>
      <footer>Copyright © 2026 Lane Robey</footer>
    </div>
  );

  function handleAction(data) {
    switch (data.actionType) {
      case "add": {
        switch (data.targetType) {
          case "workspace": {
            const newWS = new Workspace(data);
            workspaces.value = { ...workspaces.value, [newWS.id]: newWS };
            return;
          }
          case "project": {
            const newProj = new Project(data);
            const ws = workspaces[data.workspaceID];
            ws.projectIDs = [...ws.projectIDs, newProj.id];
            projects.value = { ...projects.value, [newProj.id]: newProj };
            workspaces.value = { ...workspaces.value, [ws.id]: ws };
            return;
          }
          case "task": {
            const newTask = new Task(data);
            const proj = projects[data.projectID];
            proj.taskIDs = [...proj.taskIDs, newTask.id];
            tasks.value = { ...tasks.value, [newTask.id]: newTask };
            projects.value = { ...projects.value, [proj.id]: proj };
            return;
          }
          case "setting": {
            settings.value = { ...settings.value, [data.setting]: data.value };
            return;
          }
        }
      }

      case "delete": {
        switch (data.targetType) {
          case "workspace": {
            const wses = { ...workspaces.value };
            const projs = { ...projects.value };
            const tsks = { ...tasks.value };
            wses[data.workspaceID].projectIDs.forEach((projID) => {
              projs[projID].taskIDs.forEach((tID) => delete tsks[tID]);
              delete projs[projID];
            });
            delete wses[data.workspaceID];
            tasks.value = tsks;
            projects.value = projs;
            workspaces.value = wses;
            return;
          }
          case "project": {
            const wses = { ...workspaces.value };
            const projs = { ...projects.value };
            const tsks = { ...tasks.value };
            projs[data.projectID].taskIDs.forEach((tID) => delete tsks[tID]);
            delete projs[data.projectID];
            wses[data.workspaceID].projectIDs = wses[
              data.workspaceID
            ].projectIDs.filter((projID) => projID !== data.projectID);
            tasks.value = tsks;
            projects.value = projs;
            workspaces.value = wses;
            return;
          }
          case "task": {
            const projs = { ...projects.value };
            const tsks = { ...tasks.value };
            delete tsks[data.taskID];
            projs[data.projectID].taskIDs = projs[
              data.projectID
            ].taskIDs.filter((tID) => tID !== data.taskID);
            tasks.value = tsks;
            projects.value = projs;
            return;
          }
          case "setting": {
            const sets = { ...settings.value };
            delete sets[data.setting];
            settings.value = sets;
            return;
          }
        }
      }

      case "update": {
        switch (data.targetType) {
          case "workspace": {
            const newWS = new Workspace(data);
            workspaces.value = { ...workspaces.value, [newWS.id]: newWS };
            return;
          }
          case "project": {
            const newProj = new Project(data);
            projects.value = { ...projects.value, [newProj.id]: newProj };
            return;
          }
          case "task": {
            const newTask = new Task(data);
            tasks.value = { ...tasks.value, [newTask.id]: newTask };
            return;
          }
          case "setting": {
            settings.value = { ...settings.value, [data.setting]: data.value };
            return;
          }
        }
        return;
      }

      case "select": {
        switch (data.targetType) {
          case "project": {
            setSelectedProj(data.projectID);
            console.log(data.projectID);
            return;
          }
        }
        return;
      }
    }
  }
}

export default App;
