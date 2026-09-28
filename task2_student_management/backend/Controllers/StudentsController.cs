using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.API.Models.DTOs;
using StudentManagement.API.Services;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]     // 🔒 Tous les endpoints nécessitent un token JWT
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    // =========================================================
    // GET /api/Students?search=...&major=...&sortBy=...&page=1&pageSize=10
    // =========================================================
    [HttpGet]
    public async Task<ActionResult<PaginatedResult<StudentDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? major,
        [FromQuery] string? sortBy,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // Sécurité sur les valeurs
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var result = await _studentService.GetStudentsAsync(search, major, sortBy, page, pageSize);
        return Ok(result);
    }

    // =========================================================
    // GET /api/Students/{id}
    // =========================================================
    [HttpGet("{id}")]
    public async Task<ActionResult<StudentDto>> GetById(Guid id)
    {
        try
        {
            var student = await _studentService.GetStudentByIdAsync(id);
            return Ok(student);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // =========================================================
    // POST /api/Students
    // =========================================================
    [HttpPost]
    public async Task<ActionResult<StudentDto>> Create([FromBody] CreateStudentRequest request)
    {
        try
        {
            var student = await _studentService.CreateStudentAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = student.Id }, student);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // =========================================================
    // PUT /api/Students/{id}
    // =========================================================
    [HttpPut("{id}")]
    public async Task<ActionResult<StudentDto>> Update(Guid id, [FromBody] UpdateStudentRequest request)
    {
        try
        {
            var student = await _studentService.UpdateStudentAsync(id, request);
            return Ok(student);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // =========================================================
    // DELETE /api/Students/{id}
    // =========================================================
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _studentService.DeleteStudentAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}