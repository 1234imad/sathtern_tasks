using StudentManagement.API.Models.DTOs;

namespace StudentManagement.API.Services;

public interface IStudentService
{
    Task<PaginatedResult<StudentDto>> GetStudentsAsync(
        string? search,
        string? major,
        string? sortBy,
        int page,
        int pageSize);

    Task<StudentDto> GetStudentByIdAsync(Guid id);
    Task<StudentDto> CreateStudentAsync(CreateStudentRequest request);
    Task<StudentDto> UpdateStudentAsync(Guid id, UpdateStudentRequest request);
    Task DeleteStudentAsync(Guid id);
}