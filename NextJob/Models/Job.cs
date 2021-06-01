using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NextJob.Models
{
    public class Job
    {
        public Guid ID { get; set; }

        public string Title { get; set; }

        public string Field { get; set; }

        public Guid EmployerID { get; set; }

        public string Description { get; set; }

        public string Workplace { get; set; }

        public string CareerLevel { get; set; }

        public string Type { get; set; }
    }
}
