using StudentManagement.API.Models.Entities;

namespace StudentManagement.API.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}