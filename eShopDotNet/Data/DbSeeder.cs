using eShopSystem.Constants;
using eShopSystem.Models;
using Microsoft.AspNetCore.Identity;
using System;


namespace eShopSystem.Data
{
    public static class DbSeeder
    {
        public static async Task SeedRolesAndAdminAsync(IServiceProvider service)
        {
            //Seed Roles
            var userManager = service.GetService<UserManager<ApplicationUser>>();
            var roleManager = service.GetService<RoleManager<IdentityRole>>();
            if (await roleManager.FindByNameAsync(Roles.Admin.ToString()) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
            }

            if (await roleManager.FindByNameAsync(Roles.User.ToString()) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.User.ToString()));
            }

            // creating admin

            var user = new ApplicationUser
            {
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com",
                Name = "Rama",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            var userInDb = await userManager.FindByEmailAsync(user.Email);
            if (userInDb == null)
            {
                await userManager.CreateAsync(user, "Admin@123");
                await userManager.AddToRoleAsync(user, Roles.Admin.ToString());
            }
        }

    }
}
