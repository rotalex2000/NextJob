using Microsoft.EntityFrameworkCore.Migrations;

namespace NextJob.Migrations
{
    public partial class ImplementedJobCRUD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CandidatePhone",
                table: "Application",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "CandidateLastName",
                table: "Application",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "CandidateFirstName",
                table: "Application",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "CandidateEmail",
                table: "Application",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "Admin",
                newName: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Application",
                newName: "CandidatePhone");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Application",
                newName: "CandidateLastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Application",
                newName: "CandidateFirstName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Application",
                newName: "CandidateEmail");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Admin",
                newName: "username");
        }
    }
}
