using Moq;
using Microsoft.EntityFrameworkCore;
using eShopSystem.Controllers;
using eShopSystem.Models;
using eShopSystem.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace eShopSystem.Tests
{
    public class CategoriesControllerTests
    {
        private readonly ApplicationDbContext _context;
        private readonly CategoriesController _controller;

        public CategoriesControllerTests()
        {
            // Setup InMemory database with a unique name for each test run
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "eShopTestDb" + Guid.NewGuid()) // Ensuring a unique database for each test run
                .Options;

            _context = new ApplicationDbContext(options);

            // Ensure the database is cleared and seeded before each test
            SeedDatabase();

            _controller = new CategoriesController(_context);
        }

        private void SeedDatabase()
        {
            // Clear any existing data (ensures the test starts with a clean state)
            _context.Categories.RemoveRange(_context.Categories);
            _context.SaveChanges();

            // Seed categories with specific IDs
            _context.Categories.AddRange(
                new Category { Id = 17, CategoryName = "Tennis Rackets" },
                new Category { Id = 22, CategoryName = "TT Bats" },
                new Category { Id = 25, CategoryName = "Sports" }
            );
            _context.SaveChanges();
        }

        // Test Index action
        [Fact]
        public async Task Index_Returns_ViewResult_With_Categories()
        {
            var result = await _controller.Index();
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Category>>(viewResult.Model);
            Assert.Equal(3, model.Count);  // Adjusted based on the 3 categories seeded
        }

        // Test Create action (GET)
        [Fact]
        public void Create_Returns_ViewResult()
        {
            var result = _controller.Create();
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.NotNull(viewResult);
        }

        // Test Create action (POST)
        [Fact]
        public async Task Create_Adds_Category_And_Redirects()
        {
            var newCategory = new Category { CategoryName = "Electronics" };

            var result = await _controller.Create(newCategory);

            var redirectResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectResult.ActionName);

            var categoryInDb = _context.Categories.FirstOrDefault(c => c.CategoryName == "Electronics");
            Assert.NotNull(categoryInDb);
        }

        // Test Edit action (GET)
        [Fact]
        public async Task Edit_Returns_ViewResult_With_Category()
        {
            var result = await _controller.Edit(17);  // 17 exists in the seeded data
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Category>(viewResult.Model);
            Assert.Equal(17, model.Id);
        }

        // Test Delete action (GET)
        [Fact]
        public async Task Delete_Returns_ViewResult_With_Category()
        {
            var result = await _controller.Delete(22);  // 22 exists in the seeded data
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Category>(viewResult.Model);
            Assert.Equal(22, model.Id);
        }

        // Test Delete action (POST)
        [Fact]
        public async Task DeleteConfirmed_Removes_Category_And_Redirects()
        {
            var result = await _controller.DeleteConfirmed(17);  // 17 exists in the seeded data
            var redirectResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectResult.ActionName);

            var categoryInDb = _context.Categories.Find(17);
            Assert.Null(categoryInDb);  // Category with ID 17 should be deleted
        }
    }
}
