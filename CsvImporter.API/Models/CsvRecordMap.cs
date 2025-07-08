using CsvHelper.Configuration;

namespace CsvImporter.API.Models
{
    public class CsvRecordMap : ClassMap<CsvRecord>
    {
        public CsvRecordMap()
        {
            Map(m => m.Name);
            Map(m => m.Age);
            Map(m => m.Email);
        }
    }
}