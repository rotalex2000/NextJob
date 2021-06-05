using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NextJob.Models
{
    public class Admin
    {
        public string ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}
