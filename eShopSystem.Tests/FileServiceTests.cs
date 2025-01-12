using eShopSystem.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Moq;
using System;
using System.IO;
using System.Text.RegularExpressions;
using Xunit;

namespace eShopSystem.Tests
{
    public class FileServiceTests
    {
        private readonly Mock<IWebHostEnvironment> _mockEnv;
        private readonly FileService _fileService;

        public FileServiceTests()
        {
            // Mock the IWebHostEnvironment dependency
            _mockEnv = new Mock<IWebHostEnvironment>();
            _mockEnv.Setup(env => env.WebRootPath).Returns("C:\\Users\\Somwanshi\\Music\\images");  // Mock the WebRootPath
            _fileService = new FileService(_mockEnv.Object);  // Initialize the FileService
        }

        [Fact]
        public void SaveImage_ShouldReturnSuccess_WhenImageIsValid()
        {
            // Arrange
            var fileMock = new Mock<IFormFile>();
            fileMock.Setup(f => f.FileName).Returns("test.jpg");
            fileMock.Setup(f => f.CopyTo(It.IsAny<Stream>())).Callback<Stream>((s) =>
            {
                using (var writer = new StreamWriter(s))
                {
                    writer.Write("test image content");
                }
            });

            // Act
            var result = _fileService.SaveImage(fileMock.Object);

            // Assert
            Assert.Equal(1, result.Item1);  // Success

            // Check that the result contains a GUID pattern and ends with .jpg
            var fileName = result.Item2;

            // Regular expression to check for GUID format (example: 55306ddd-4aaf-450e-83fe-4ac1767f7bb7.jpg)
            var guidPattern = @"^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.jpg$";  // Pattern for GUID + .jpg extension

            // Assert that the file name matches the GUID pattern and ends with .jpg
            Assert.Matches(guidPattern, fileName);
        }

        [Fact]
        public void SaveImage_ShouldReturnError_WhenImageIsInvalidExtension()
        {
            // Arrange
            var fileMock = new Mock<IFormFile>();
            fileMock.Setup(f => f.FileName).Returns("test.gif");

            // Act
            var result = _fileService.SaveImage(fileMock.Object);

            // Assert
            Assert.Equal(0, result.Item1);  // Failure
            Assert.Contains("Only .jpg, .png, .jpeg extensions are allowed", result.Item2);  // Correct expected message
        }
    }
}
