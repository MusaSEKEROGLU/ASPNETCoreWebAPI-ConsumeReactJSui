using CoreWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public EmployeesController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        //Tüm Çalışanları getir.
        [HttpGet]
        public JsonResult GetAllEmployee()
        {
            String query = @"Select EmployeeId,EmployeeName,Department,
                                 Convert(varchar(10),DateOfJoining,120) as DateOfJoining,
                                 PhotoFileName from Employee";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Yeni Çalışan oluştur.
        [HttpPost]
        public JsonResult CreateOneEmployee(Employee employee)
        {
            String query = @"Insert Into Employee Values (@EmployeeName,@Department,@DateOfJoining,@PhotoFileName)";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    cmd.Parameters.AddWithValue("@Department", employee.Department);
                    cmd.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    cmd.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }


        //Çalışan bilgilerini güncelle.
        [HttpPut]
        public JsonResult UpdateOneEmployee(Employee employee)
        {
            String query = @"Update Employee Set 
                              EmployeeName = @EmployeeName,
                              Department = @Department,
                              DateOfJoining = @DateOfJoining,
                              PhotoFileName = @PhotoFileName 
                              Where EmployeeId = @EmployeeId";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                    cmd.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    cmd.Parameters.AddWithValue("Department", employee.Department);
                    cmd.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    cmd.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Çalışanı sil.
        [HttpDelete("{id}")]
        public JsonResult UpdateOneEmployee(int id)
        {
            String query = @"Delete from Employee Where EmployeeId = @EmployeeId ";
            DataTable table = new DataTable();
            String sqlDataSource = _configuration.GetConnectionString("ReactJS+.NETCoreWebAPIConection");
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@EmployeeId", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        //Resim dosyaları yükleme.
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                String fileName = postedFile.FileName;
                var physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + fileName;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("gs.png");
            }
        }
    }
}
