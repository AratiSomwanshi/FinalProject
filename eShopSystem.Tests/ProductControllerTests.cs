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
    public class ProductControllerTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("eShopTestDb" + Guid.NewGuid()) // Unique name for each test run
                .Options;

            _context = new ApplicationDbContext(options);
            SeedDatabase();
            _controller = new ProductController(_context);
        }

        private void SeedDatabase()
        {
            // Clear any existing data
            _context.Categories.RemoveRange(_context.Categories);
            _context.Products.RemoveRange(_context.Products);
            _context.SaveChanges();

            // Add unique categories
            _context.Categories.AddRange(
                new Category { CategoryName = "Sports" },
                new Category { CategoryName = "Backpacks" },
                new Category { CategoryName = "Tennis Rackets" }
            );

            // Add products linked to categories, make sure all required properties are filled
            _context.Products.AddRange(
                new Product { Name = "Basketball", Price = 25, CategoryId = 1, Description = "High-quality basketball" },
                new Product { Name = "Football", Price = 20, CategoryId = 2, Description = "Durable football" },
                new Product { Name = "Tennis Racket", Price = 50, CategoryId = 3, Description = "Professional tennis racket" }
            );

            _context.SaveChanges();
        }

        // Test Index action
        [Fact]
        public async Task Index_Returns_ViewResult_With_Products()
        {
            var result = await _controller.Index();
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<Product>>(viewResult.Model);
            Assert.Equal(3, model.Count);  // Expecting 3 products now
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
        public async Task Create_Adds_Product_And_Redirects()
        {
            var newProduct = new Product { Name = "Basketball Shoes", Price = 100, CategoryId = 1, Description = "Comfortable and durable" };

            var result = await _controller.Create(newProduct);

            var redirectResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectResult.ActionName);

            var productInDb = _context.Products.FirstOrDefault(p => p.Name == "Basketball Shoes");
            Assert.NotNull(productInDb);
        }

        // Test Edit action (GET)
        [Fact]
        public async Task Edit_Returns_ViewResult_With_Product()
        {
            var result = await _controller.Edit(1);  // Id=1 should exist
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Product>(viewResult.Model);
            Assert.Equal(1, model.Id);
        }

        // Test Delete action (GET)
        [Fact]
        public async Task Delete_Returns_ViewResult_With_Product()
        {
            var result = await _controller.Delete(1);  // Id=1 should exist
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<Product>(viewResult.Model);
            Assert.Equal(1, model.Id);
        }

        // Test Delete action (POST)
        [Fact]
        public async Task DeleteConfirmed_Removes_Product_And_Redirects()
        {
            var result = await _controller.DeleteConfirmed(1);
            var redirectResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectResult.ActionName);

            var productInDb = _context.Products.Find(1);
            Assert.Null(productInDb);
        }
    }
}
