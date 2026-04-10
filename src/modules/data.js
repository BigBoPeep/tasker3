import { isPast } from "date-fns";

export class Task {
  constructor({ id, title, desc, deadline, created, completed }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc ?? "";
    this.deadline = deadline;
    this.completed = completed ?? false;
    this.created = created ?? new Date().toISOString();
  }

  get overdue() {
    if (isPast(this.deadline) && this.completed === false) return true;
    else return false;
  }

  get incomplete() {
    if (this.completed !== false) return false;
    else return true;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      deadline: this.deadline,
      completed: this.completed,
      created: this.created,
    };
  }
}

export class Project {
  constructor({ id, title, desc, deadline, created, completed, taskIDs }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc ?? "";
    this.deadline = deadline;
    this.completed = completed ?? false;
    this.created = created ?? new Date().toISOString();
    this.taskIDs = taskIDs ?? [];
  }

  get overdue() {
    if (isPast(this.deadline) && this.completed === false) return true;
    else return false;
  }

  get incomplete() {
    if (this.completed !== false) return false;
    else return true;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      deadline: this.deadline,
      completed: this.completed,
      created: this.created,
      taskIDs: this.taskIDs,
    };
  }
}

export class Workspace {
  constructor({ id, title, desc, created, projectIDs }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.desc = desc ?? "";
    this.created = created ?? new Date().toISOString();
    this.projectIDs = projectIDs ?? [];
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      created: this.created,
      projectIDs: this.projectIDs,
    };
  }
}
