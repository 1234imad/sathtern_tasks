using TaskStatus = Sathtern.ToDoList.API.Models.Entities.TaskStatus;
using TaskPriority = Sathtern.ToDoList.API.Models.Entities.TaskPriority;

namespace Sathtern.ToDoList.API.Models.DTOs;

public class UpdateTaskRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }
    public TaskPriority Priority { get; set; }
    public DateTime? DueDate { get; set; }
}