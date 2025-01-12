using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eShopSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddCartDataToCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CartData",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CartData",
                table: "Carts");
        }
    }
}
