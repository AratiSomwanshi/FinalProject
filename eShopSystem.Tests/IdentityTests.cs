using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace eShopSystem.Tests
{
    public class IdentityTests : IClassFixture<WebApplicationFactory<Program>> // Use Program class here
    {
        private readonly WebApplicationFactory<Program> _factory;

        public IdentityTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        private async Task<HttpClient> GetAuthenticatedClientAsync(string username, string password)
        {
            var client = _factory.CreateClient();

            var loginData = new Dictionary<string, string>
            {
                { "username", username },
                { "password", password }
            };

            // Login the user
            var loginResponse = await client.PostAsync("/Account/Login", new FormUrlEncodedContent(loginData));

            return client; // Use the authenticated client for further requests
        }

        [Fact]
        public async Task Register_ShouldCreateUser_WhenValidDataProvided()
        {
            // Arrange: Setup the necessary data for a new user
            var client = _factory.CreateClient();
            var newUser = new
            {
                UserName = "testuser",
                Email = "testuser@example.com",
                Password = "Password123!"
            };

            // Act: Post the new user data to the registration endpoint
            var response = await client.PostAsJsonAsync("/Account/Register", newUser);

            // Assert: Verify the response (e.g., check if registration was successful)
            response.EnsureSuccessStatusCode();  // Should be 200 or 201
            Assert.Contains("User created successfully", await response.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task Login_ShouldReturnSuccess_WhenValidCredentialsProvided()
        {
            // Arrange: Create a client and a new user in the database
            var client = _factory.CreateClient();
            var newUser = new
            {
                UserName = "testuser",
                Email = "testuser@example.com",
                Password = "Password123!"
            };

            // First, register the user
            var registerResponse = await client.PostAsJsonAsync("/Account/Register", newUser);
            registerResponse.EnsureSuccessStatusCode();

            // Act: Login with the same credentials
            var loginData = new Dictionary<string, string>
            {
                { "username", newUser.UserName },
                { "password", newUser.Password }
            };
            var loginResponse = await client.PostAsync("/Account/Login", new FormUrlEncodedContent(loginData));

            // Assert: Check if login was successful
            loginResponse.EnsureSuccessStatusCode();
            Assert.Contains("Login successful", await loginResponse.Content.ReadAsStringAsync());
        }
    }
}
