import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './todo-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [TaskListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-list-frontend'
}
