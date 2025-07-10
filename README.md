# CSV Importer

A simple full-stack application that allows users to upload a CSV file, preview the contents in a table, and delete individual or all records. Built with React (Vite) frontend and ASP.NET Core 9 Web API backend using SQLite.

---

## 🚀 Features

- Upload CSV files via drag-and-drop or file selector
- Automatically parses and displays records
- Delete individual records or clear all
- Toast notifications for user actions
- Responsive UI with loading indicators
- Built with:
  - Frontend: React + TypeScript + Bootstrap
  - Backend: .NET 9 Web API + CsvHelper
  - Database: SQLite + Entity Framework Core


## 🔧 Setup Instructions
Backend: 
cd CsvImporter.API
dotnet restore
dotnet ef database update
dotnet run
Backend runs on: https://localhost:5001

Frontend:
cd ../CsvImporter.UI
npm install
npm run dev
Frontend runs on: http://localhost:5173


### 1. Clone the repository

```bash
git clone https://github.com/your-username/csv-importer.git
cd csv-importer