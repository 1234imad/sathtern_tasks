using Microsoft.EntityFrameworkCore;
using Sathtern.ToDoList.API.Data;
using Sathtern.ToDoList.API.Models.DTOs;
using Sathtern.ToDoList.API.Models.Entities;
using TaskStatus = Sathtern.ToDoList.API.Models.Entities.TaskStatus;

namespace Sathtern.ToDoList.API.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskDto>> GetUserTasksAsync(Guid userId)
    {
        return await _context.Tasks
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => ToDto(t))
            .ToListAsync();
    }

    public async Task<TaskDto> GetTaskByIdAsync(Guid taskId, Guid userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId)
            ?? throw new KeyNotFoundException("Tâche introuvable.");

        return ToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskRequest request, Guid userId)
    {
        var task = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate?.ToUniversalTime(),   // ✅ Conversion UTC
            Status = TaskStatus.Todo,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return ToDto(task);
    }

    public async Task<TaskDto> UpdateTaskAsync(Guid taskId, UpdateTaskRequest request, Guid userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId)
            ?? throw new KeyNotFoundException("Tâche introuvable.");

        task.Title = request.Title;
        task.Description = request.Description;
        task.Status = request.Status;
        task.Priority = request.Priority;
        task.DueDate = request.DueDate?.ToUniversalTime();   // ✅ Conversion UTC
        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return ToDto(task);
    }

    public async Task DeleteTaskAsync(Guid taskId, Guid userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId)
            ?? throw new KeyNotFoundException("Tâche introuvable.");

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }

    private static TaskDto ToDto(TaskItem t) => new()
    {
        Id = t.Id,
        Title = t.Title,
        Description = t.Description,
        Status = t.Status,
        Priority = t.Priority,
        DueDate = t.DueDate,
        CreatedAt = t.CreatedAt,
        UpdatedAt = t.UpdatedAt
    };
}