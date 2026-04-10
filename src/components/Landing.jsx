import React from "react";
import { ArrowDownRightSquare } from "lucide-react";

export default function Landing() {
  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="px-2 py-1 bg-transBG-1 rounded-md leading-tight">
        <p className="text-4xl text-center">Welcome to Tasker!</p>
        <p className="first-letter:text-2xl">
          {`Here you can keep track of everything you need to get
            done, all organized by Project and Workspace. Data is stored on your device by your 
            browser (Projects, Tasks, etc added on one device won't show up on another).`}
        </p>
      </div>
      <details
        className="bg-transBG-1 group details-content:h-0 open:details-content:h-auto 
          details-content:transition-all details-content:transition-discrete details-content:duration-700 
          details-content:ease-in-out overflow-hidden rounded-md"
      >
        <summary className="flex p-2 gap-2 cursor-pointer">
          <ArrowDownRightSquare
            className="-rotate-45 group-open:rotate-0 transition-transform 
              duration-700 transform-gpu ease-in-out"
          />
          How To Use
        </summary>
        <div className="px-2 py-1">
          {`Start by creating a Workspace (Office, Home, etc.). Inside that Workspace create a 
              new Project (Budget Meeting, Bathroom Remodel, etc.). Select your new Project and 
              in the new view you'll find controls for managing the Project as well as individual 
              Tasks required to complete that Project. Select a Task for a detailed view and editing.`}
        </div>
      </details>
    </div>
  );
}
