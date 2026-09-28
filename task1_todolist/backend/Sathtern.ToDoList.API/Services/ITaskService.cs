using Sathtern.ToDoList.API.Models.DTOs;

namespace Sathtern.ToDoList.API.Services;

public interface ITaskService
{
    Task<List<TaskDto>> GetUserTasksAsync(Guid userId);
    Task<TaskDto> GetTaskByIdAsync(Guid taskId, Guid userId);
    Task<TaskDto> CreateTaskAsync(CreateTaskRequest request, Guid userId);
    Task<TaskDto> UpdateTaskAsync(Guid taskId, UpdateTaskRequest request, Guid userId);
    Task DeleteTaskAsync(Guid taskId, Guid userId);
}