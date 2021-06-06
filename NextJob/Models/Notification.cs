using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NextJob.Models
{
    public class Notification
    {
        public Guid ID { get; set; }
        public string Text { get; set; }
        public bool Seen { get; set; }
    }
}
