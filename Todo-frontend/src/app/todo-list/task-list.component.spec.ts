import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskItem, TaskManagerService } from './task-manager.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskManagerService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskManagerService', [
      'fetchAllTasks',
      'createTask',
      'removeTask',
      'modifyTask',
      'searchTasks',
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [{ provide: TaskManagerService, useValue: taskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    const mockTasks: TaskItem[] = [
      { id: 1, title: 'Task A', description: 'Desc A', isDone: false },
      { id: 2, title: 'Task B', description: 'Desc B', isDone: false },
    ];

    taskServiceSpy.fetchAllTasks.and.returnValue(of(mockTasks));
    component.ngOnInit();

    expect(taskServiceSpy.fetchAllTasks).toHaveBeenCalled();
    expect(component.taskList.length).toBe(2);
    expect(component.taskList[0].title).toBe('Task A');
  });

  it('should add a new task', () => {
    const newTask: TaskItem = { id: 3, title: 'Task C', description: 'Desc C', isDone: false };
    taskServiceSpy.createTask.and.returnValue(of(newTask));

    component.newTaskTitle = 'Task C';
    component.newTaskDescription = 'Desc C';
    component.createNewTask();

    expect(taskServiceSpy.createTask).toHaveBeenCalledWith('Task C', 'Desc C');
    expect(component.taskList.some(t => t.title === 'Task C')).toBeTrue();
  });

  it('should delete a task', () => {
    component.taskList = [
      { id: 1, title: 'Task A', description: 'Desc A', isDone: false },
      { id: 2, title: 'Task B', description: 'Desc B', isDone: false },
    ];

    taskServiceSpy.removeTask.and.returnValue(of(void 0));
    component.onDelete(1);

    expect(taskServiceSpy.removeTask).toHaveBeenCalledWith(1);
    expect(component.taskList.length).toBe(1);
    expect(component.taskList[0].id).toBe(2);
  });
});
