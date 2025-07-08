using Microsoft.EntityFrameworkCore;
using CsvImporter.API.Models;

namespace CsvImporter.API.Data
{
    public class CsvContext : DbContext
    {
        public CsvContext(DbContextOptions<CsvContext> options)
            : base(options) { }

        public DbSet<CsvRecord> CsvRecords { get; set; }
    }

}

