using Microsoft.EntityFrameworkCore;
using StudentManagement.API.Data;
using StudentManagement.API.Models.DTOs;
using StudentManagement.API.Models.Entities;

namespace StudentManagement.API.Services;

public class StudentService : IStudentService
{
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL avec recherche + tri + pagination
    public async Task<PaginatedResult<StudentDto>> GetStudentsAsync(
        string? search,
        string? major,
        string? sortBy,
        int page,
        int pageSize)
    {
        // 1. Requête de base
        var query = _context.Students.AsQueryable();

        // 2. Recherche (nom, prénom, email)
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.ToLower();
            query = query.Where(st =>
                st.FirstName.ToLower().Contains(s) ||
                st.LastName.ToLower().Contains(s) ||
                st.Email.ToLower().Contains(s));
        }

        // 3. Filtre par filière
        if (!string.IsNullOrWhiteSpace(major))
        {
            query = query.Where(st => st.Major == major);
        }

        // 4. Tri dynamique
        query = sortBy?.ToLower() switch
        {
            "name" => query.OrderBy(st => st.LastName).ThenBy(st => st.FirstName),
            "gpa" => query.OrderByDescending(st => st.GPA),
            "enrollment" => query.OrderByDescending(st => st.EnrollmentDate),
            "major" => query.OrderBy(st => st.Major),
            _ => query.OrderBy(st => st.LastName)
        };

        // 5. Comptage total
        var totalCount = await query.CountAsync();

        // 6. Pagination
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(st => ToDto(st))
            .ToListAsync();

        return new PaginatedResult<StudentDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    // GET BY ID
    public async Task<StudentDto> GetStudentByIdAsync(Guid id)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == id)
            ?? throw new KeyNotFoundException("Étudiant introuvable.");

        return ToDto(student);
    }

    // CREATE
    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequest request)
    {
        // Vérifie email unique
        if (await _context.Students.AnyAsync(s => s.Email == request.Email))
            throw new InvalidOperationException("Un étudiant avec cet email existe déjà.");

        var student = new Student
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            DateOfBirth = DateTime.SpecifyKind(request.DateOfBirth, DateTimeKind.Utc),
            Address = request.Address,
            Major = request.Major,
            GPA = request.GPA,
            EnrollmentDate = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return ToDto(student);
    }

    // UPDATE
    public async Task<StudentDto> UpdateStudentAsync(Guid id, UpdateStudentRequest request)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == id)
            ?? throw new KeyNotFoundException("Étudiant introuvable.");

        // Vérifie email unique (sauf pour lui-même)
        if (await _context.Students.AnyAsync(s => s.Email == request.Email && s.Id != id))
            throw new InvalidOperationException("Un étudiant avec cet email existe déjà.");

        student.FirstName = request.FirstName;
        student.LastName = request.LastName;
        student.Email = request.Email;
        student.Phone = request.Phone;
        student.DateOfBirth = DateTime.SpecifyKind(request.DateOfBirth, DateTimeKind.Utc);
        student.Address = request.Address;
        student.Major = request.Major;
        student.GPA = request.GPA;
        student.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return ToDto(student);
    }

    // DELETE
    public async Task DeleteStudentAsync(Guid id)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == id)
            ?? throw new KeyNotFoundException("Étudiant introuvable.");

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
    }

    // Mapper : Entity → DTO
    private static StudentDto ToDto(Student s) => new()
    {
        Id = s.Id,
        FirstName = s.FirstName,
        LastName = s.LastName,
        Email = s.Email,
        Phone = s.Phone,
        DateOfBirth = s.DateOfBirth,
        Address = s.Address,
        Major = s.Major,
        GPA = s.GPA,
        EnrollmentDate = s.EnrollmentDate
    };
}