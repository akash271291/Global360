import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem, TaskManagerService } from './task-manager.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskListComponent implements OnInit {
  // Data properties
  taskList: TaskItem[] = [];

  //Adding form fields
  newTaskTitle = '';
  newTaskDescription = '';

  //Search
  searchQuery = '';

  //Edit mode tracking
  editModeId: number | null = null;
  editTitle = '';
  editDescription = '';

  constructor(private taskService: TaskManagerService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /** Loading all Todo tasks */
  loadTasks(): void {
    this.taskService.fetchAllTasks().subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  /** Searching Todo tasks */
  findTasks(): void {
    const query = this.searchQuery.trim();
    if (!query) {
      this.loadTasks();
      return;
    }
    this.taskService.searchTasks(query).subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  /** Adding a new Todo task */
  createNewTask(): void {
    const title = this.newTaskTitle.trim();
    const description = this.newTaskDescription.trim();
    if (!title || !description) return;

    this.taskService.createTask(title, description).subscribe(task => {
      this.taskList.push(task);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    });
  }

  /** Deleting a Todo task */
  onDelete(id: number): void {
    this.taskService.removeTask(id).subscribe(() => {
      this.taskList = this.taskList.filter(t => t.id !== id);
    });
  }

  /** Start editing a Todo task */
  onEdit(task: TaskItem): void {
    this.editModeId = task.id;
    this.editTitle = task.title;
    this.editDescription = task.description;
  }

  /** Cancel edit mode */
  cancelEdit(): void {
    this.editModeId = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  /** Save edited task */
  updateTask(): void {
    if (this.editModeId === null) return;

    const title = this.editTitle.trim();
    const description = this.editDescription.trim();
    if (!title || !description) return;

    this.taskService.modifyTask(this.editModeId, title, description).subscribe(updatedTask => {
      const index = this.taskList.findIndex(t => t.id === this.editModeId);
      if (index > -1) {
        this.taskList[index] = updatedTask;
      }
      this.cancelEdit();
    });
  }
}
