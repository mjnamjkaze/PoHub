using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniNetflix.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStorageTypeField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StorageType",
                table: "GoogleDriveFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StorageType",
                table: "GoogleDriveFiles");
        }
    }
}
