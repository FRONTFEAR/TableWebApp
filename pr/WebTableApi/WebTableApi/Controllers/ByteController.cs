using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebTableApi.Models;

namespace WebTableApi.Controllers
{
    /// <summary>
    /// Этот контроллер позволяет управлять данными сохраняя, получая, удаляя и обновляя их в базе данных
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ByteController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ByteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        /// <summary>
        /// Этот метод позволяет получить данные из базы данных
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ByteId, ByteBinNumber, ByteDecNumber from dbo.Byte";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ByteAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);

        }
        /// <summary>
        /// Этот метод позволяет сохранить данные в базе данных
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Post(Models.Byte bt)
        {
            string query = @"insert into dbo.Byte values
            ('" + bt.ByteBinNumber + @"','" + bt.ByteDecNumber + @"')
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ByteAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult("Added");
        }
        /// <summary>
        /// Этот метод позволяет обновить данные в базе данных
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public JsonResult Put(Models.Byte bt)
        {
            string query = @"update dbo.Byte set 
            ByteBinNumber = '" + bt.ByteBinNumber + @"',
            ByteDecNumber = '" + bt.ByteDecNumber + @"'
            where ByteId = " + bt.ByteId + @"
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ByteAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult("Updated");
        }
        /// <summary>
        /// Этот метод позволяет удалить данные из базы данных
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Byte
            where ByteId = " + id + @"
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ByteAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult("Deleted");
        }
    }
}
