using Sathtern.ToDoList.API.Models.DTOs;

namespace Sathtern.ToDoList.API.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
}