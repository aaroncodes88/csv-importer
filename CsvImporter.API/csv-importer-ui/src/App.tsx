import FileUpload from './components/FileUpload';
import CsvTable from './components/CsvTable';
import { useState } from 'react';

function App() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div
            className="container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                paddingTop: '3rem',
                paddingBottom: '3rem',
            }}
        >
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h1 className="mb-4 text-center">CSV Importer</h1>
                <FileUpload onUpload={() => setRefresh(!refresh)} />
                <CsvTable key={refresh ? 1 : 0} />
            </div>
        </div>
    );
}

export default App;
