import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private tasks: TaskItem[] = [];
  private nextId = 1;

  /** Fetch all tasks */
  fetchAllTasks(): Observable<TaskItem[]> {
    return of([...this.tasks]);
  }

  /** Search tasks */
  searchTasks(query: string): Observable<TaskItem[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.tasks.filter(
      t => t.title.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery)
    );
    return of([...results]);
  }

  /** Add a new task */
  createTask(title: string, description: string): Observable<TaskItem> {
    const task: TaskItem = {
      id: this.nextId++,
      title,
      description,
      isDone: false
    };
    this.tasks.push(task); // ✅ Add to internal array
    return of(task);
  }

  /** Modify a task */
  modifyTask(id: number, title: string, description: string): Observable<TaskItem> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    task.title = title;
    task.description = description;
    return of(task);
  }

  /** Remove a task */
  removeTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(undefined);
  }
}
