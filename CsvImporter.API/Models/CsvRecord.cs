using System.ComponentModel.DataAnnotations;

namespace CsvImporter.API.Models
{
    public class CsvRecord
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
    }
}