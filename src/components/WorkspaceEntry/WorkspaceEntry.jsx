import "./WorkspaceEntry.css";
import React from "react";
import { Ellipsis } from "lucide-react";

export default function WorkspaceEntry({ workspaceID, workspaces, projects }) {
  const workspace = workspaces.value[workspaceID];

  return (
    <details className="workspace-entry">
      <summary>
        <span>{workspace.title}</span>
        <button>
          <Ellipsis />
        </button>
      </summary>
      {workspace.projectIDs.map((projectID) => {
        const project = projects.value[projectID];
        return <div className="project-entry">{project.title}</div>;
      })}
    </details>
  );
}
