using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTableApi.Models
{
    public class Byte
    {
        /// <summary>
        /// Id байта в базе данных
        /// </summary>
        public int ByteId { get; set; }
        /// <summary>
        /// Бмнарное число байта
        /// </summary>
        public string ByteBinNumber { get; set; }
        /// <summary>
        /// Десятичное число байта
        /// </summary>
        public string ByteDecNumber { get; set; }
    }
}
