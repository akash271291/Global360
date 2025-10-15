var builder = WebApplication.CreateBuilder(args);

// Enable CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

// STARTER OF TASK LIST API

// Initiating Todo task list
var taskList = new List<TaskItem>();
var nextId = 1;

// Adding new Todo Task
app.MapPost("/api/tasks", (TaskItemDto dto) =>
{
    var task = new TaskItem
    {
        Id = nextId++,
        Heading = dto.Heading,        
        Description = dto.Description, 
        IsDone = dto.IsDone           
    };

    taskList.Add(task);

    return Results.Created($"/api/tasks/{task.Id}", task);
});

// Fetching the list of all Tasks
app.MapGet("/api/tasks", () => Results.Ok(taskList));


// Updating a Todo Task
app.MapPut("/api/tasks/{id:int}", (int id, TaskItemDto dto) =>
{
    // searching the task by ID
    var task = taskList.FirstOrDefault(t => t.Id == id);

    if (task == null)
        return Results.NotFound();

    task.Heading = dto.Heading;
    task.Description = dto.Description;
    task.IsDone = dto.IsDone;

    return Results.Ok(task);
});

// Deleting a Todo Task
app.MapDelete("/api/tasks/{id:int}", (int id) =>
{
    // Find the task by ID
    var task = taskList.FirstOrDefault(t => t.Id == id);

    if (task == null)
        return Results.NotFound();

    taskList.Remove(task);

    return Results.NoContent();
});

// Searching Todo Tasks by heading or description
app.MapGet("/api/tasks/search", (string searchQuery) =>
{
    var keyword = searchQuery?.Trim().ToLower() ?? "";

    // Fetching tasks using the keyword
    var results = taskList.Where(t =>
        t.Heading.ToLower().Contains(keyword) ||
        t.Description.ToLower().Contains(keyword)
    ).ToList();

    return Results.Ok(results);
});

app.Run();


record TaskItemDto
{
    public string Heading { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsDone { get; set; } = false;
}

// Task item model
record TaskItem
{
    public int Id { get; set; }
    public string Heading { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsDone { get; set; } = false;
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
