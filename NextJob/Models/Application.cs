using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NextJob.Models
{
    public class Application
    {
        public Guid ID { get; set; }
        public Guid JobID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
    }
}
