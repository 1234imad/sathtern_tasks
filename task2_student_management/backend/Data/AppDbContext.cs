using Microsoft.EntityFrameworkCore;
using StudentManagement.API.Models.Entities;

namespace StudentManagement.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Student> Students => Set<Student>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Email unique pour User
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Email unique pour Student
        modelBuilder.Entity<Student>()
            .HasIndex(s => s.Email)
            .IsUnique();

        // Précision pour GPA (décimal 3,2 → ex: 3.75)
        modelBuilder.Entity<Student>()
            .Property(s => s.GPA)
            .HasPrecision(3, 2);

        base.OnModelCreating(modelBuilder);
    }
}