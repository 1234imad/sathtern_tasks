using Sathtern.ToDoList.API.Models.Entities;

namespace Sathtern.ToDoList.API.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}