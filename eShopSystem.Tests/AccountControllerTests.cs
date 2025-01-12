using Moq;
using Xunit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using System.Collections.Generic;
using eShopSystem.Models;
using eShopSystem.Tests;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

public class AccountControllerTests
{
    private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
    private readonly Mock<SignInManager<ApplicationUser>> _mockSignInManager;
    private readonly AccountController _controller;

    public AccountControllerTests()
    {
        var mockContext = new Mock<DbContext>();
        var mockUserStore = new Mock<IUserStore<ApplicationUser>>();

        _mockUserManager = new Mock<UserManager<ApplicationUser>>(
            mockUserStore.Object,
            null,
            new PasswordHasher<ApplicationUser>(),
            null,
            null,
            null,
            null,
            null,
            null
        );

        _mockSignInManager = new Mock<SignInManager<ApplicationUser>>(
            _mockUserManager.Object,
            null,
            new HttpContextAccessor(),
            null,
            null,
            null,
            null
        );

        _controller = new AccountController(
            _mockUserManager.Object,
            _mockSignInManager.Object
        );
    }

    [Fact]
    public async Task Register_ReturnsRedirectToAction_WhenValidModelState()
    {
        // Arrange: Create a valid model for registration
        var model = new RegisterViewModel
        {
            UserName = "testuser",
            Email = "testuser@example.com",
            Password = "Password123!",
            ConfirmPassword = "Password123!"
        };

        // Setup the mock UserManager to simulate user creation
        _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), model.Password))
            .ReturnsAsync(IdentityResult.Success);

        // Act: Call the Register action
        var result = await _controller.Register(model);

        // Assert: Ensure the result is a RedirectToAction (successful registration)
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Login", redirectResult.ActionName);
    }

    [Fact]
    public async Task Login_ReturnsRedirectToAction_WhenValidCredentials()
    {
        // Arrange: Simulate a valid user and valid credentials
        var model = new LoginViewModel
        {
            UserName = "testuser",
            Password = "Password123!"
        };

        // Setup the mock SignInManager to simulate login success
        _mockSignInManager.Setup(x => x.PasswordSignInAsync(model.UserName, model.Password, false, false))
            .ReturnsAsync(Microsoft.AspNetCore.Identity.SignInResult.Success);

        // Act: Call the Login action
        var result = await _controller.Login(model);

        // Assert: Ensure the result is a RedirectToAction (successful login)
        var redirectResult = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirectResult.ActionName); // Or any action after login
    }
}
