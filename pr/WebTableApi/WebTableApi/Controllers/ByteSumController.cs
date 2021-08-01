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
    /// Этот контроллер позволяет скадывать байты добавляя результат в базу данных
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ByteSumController:ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ByteSumController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        /// <summary>
        /// Этот метод складывает байты добавляя результат в базу данных
        /// </summary>
        [HttpPost]
        public JsonResult Post(Models.Byte bt)
        {
            bt.ByteDecNumber = Convert.ToString(Convert.ToInt32(bt.ByteBinNumber) + Convert.ToInt32(bt.ByteDecNumber));
            bt.ByteBinNumber = Convert.ToString(Convert.ToInt32(bt.ByteDecNumber), 2);
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

    }

   

       
}
