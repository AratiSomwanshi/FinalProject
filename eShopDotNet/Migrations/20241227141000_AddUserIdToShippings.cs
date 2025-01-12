using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eShopSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToShippings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Shippings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_UserId",
                table: "Shippings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_AspNetUsers_UserId",
                table: "Shippings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_AspNetUsers_UserId",
                table: "Shippings");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_UserId",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Shippings");
        }
    }
}
