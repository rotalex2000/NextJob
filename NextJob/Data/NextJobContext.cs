using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NextJob.Models;

namespace NextJob.Data
{
    public class NextJobContext : DbContext
    {
        public NextJobContext (DbContextOptions<NextJobContext> options)
            : base(options)
        {
        }

        public DbSet<NextJob.Models.Job> Job { get; set; }
    }
}
