using CoreWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace CoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public DepartmentsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Tüm Departmanları getir.
        [HttpGet]
        public JsonResult GetAllDepartment()
        {
            String query = @"Select DepartmentId,DepartmentName from Department";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using(SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand(query, conn))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Yeni Departman oluştur.
        [HttpPost]
        public JsonResult CreateOneDepartment(Department department)
        {
            String query = @"Insert Into Department Values(@DepartmentName)";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Departman bilgilerini güncelle.
        [HttpPut]
        public JsonResult UpdateOneDepartment(Department department)
        {
            String query = @"Update Department Set DepartmentName = @DepartmentName Where DepartmentId = @DepartmentId";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@DepartmentId", department.DepartmentId);
                    cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Departman sil.
        [HttpDelete("{id}")]
        public JsonResult UpdateOneDepartment(int id)
        {
            String query = @"Delete from Department Where DepartmentId = @DepartmentId ";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@DepartmentId", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
