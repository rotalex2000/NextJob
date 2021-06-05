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

        public string Description { get; set; }

        public string Workplace { get; set; } // office/home

        public string CareerLevel { get; set; } // min years of xp

        public string Type { get; set; } // full-time/part-tinme
    }
}
