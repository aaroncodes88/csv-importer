using CsvHelper;
using CsvImporter.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using CsvContext = CsvImporter.API.Data.CsvContext;

namespace CsvImporter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CsvUploadController : ControllerBase
    {
        private readonly CsvContext _context;

        public CsvUploadController(CsvContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllCsvRecords()
        {
            var records = _context.CsvRecords.ToList();
            return Ok(records);
        }

        [HttpPost("upload")]
        public IActionResult UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            List<CsvRecord> records;

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                csv.Context.RegisterClassMap<CsvRecordMap>();

                try
                {
                    records = csv.GetRecords<CsvRecord>().ToList();
                }
                catch (Exception ex)
                {
                    return BadRequest($"CSV parsing error: {ex.Message}");
                }
            }

            _context.CsvRecords.AddRange(records);
            _context.SaveChanges();

            return Ok($"{records.Count} records successfully imported.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCsvRecord(int id)
        {
            var record = _context.CsvRecords.FirstOrDefault(r => r.Id == id);
            if (record == null)
            {
                return NotFound($"No record found with ID {id}.");
            }

            _context.CsvRecords.Remove(record);
            _context.SaveChanges();

            return Ok($"Record with ID {id} deleted.");
        }
        
        [HttpDelete("clear")]
        public IActionResult ClearAllRecords()
        {
            var allRecords = _context.CsvRecords.ToList();

            if (!allRecords.Any())
                return Ok("No records to delete.");

            _context.CsvRecords.RemoveRange(allRecords);
            _context.SaveChanges();

            return Ok($"{allRecords.Count} records deleted.");
        }
    }
}