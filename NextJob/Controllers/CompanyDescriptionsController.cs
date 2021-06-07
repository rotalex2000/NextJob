using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NextJob.Data;
using NextJob.Models;

namespace NextJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyDescriptionsController : ControllerBase
    {
        private readonly NextJobContext _context;

        public CompanyDescriptionsController(NextJobContext context)
        {
            _context = context;
        }

        // GET: api/CompanyDescriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyDescription>>> GetCompanyDescription()
        {
            return await _context.CompanyDescription.ToListAsync();
        }

        // GET: api/CompanyDescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDescription>> GetCompanyDescription(Guid id)
        {
            var companyDescription = await _context.CompanyDescription.FindAsync(id);

            if (companyDescription == null)
            {
                return NotFound();
            }

            return companyDescription;
        }

        // PUT: api/CompanyDescriptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyDescription(Guid id, CompanyDescription companyDescription)
        {
            if (id != companyDescription.ID)
            {
                return BadRequest();
            }

            _context.Entry(companyDescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyDescriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CompanyDescriptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CompanyDescription>> PostCompanyDescription(CompanyDescription companyDescription)
        {
            _context.CompanyDescription.Add(companyDescription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompanyDescription", new { id = companyDescription.ID }, companyDescription);
        }

        // DELETE: api/CompanyDescriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanyDescription(Guid id)
        {
            var companyDescription = await _context.CompanyDescription.FindAsync(id);
            if (companyDescription == null)
            {
                return NotFound();
            }

            _context.CompanyDescription.Remove(companyDescription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyDescriptionExists(Guid id)
        {
            return _context.CompanyDescription.Any(e => e.ID == id);
        }
    }
}
