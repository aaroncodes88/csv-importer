import { useState } from 'react';
import { uploadCsv } from '../api';

export default function FileUpload({ onUpload }: { onUpload: () => void }) {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        await uploadCsv(file);
        setFile(null);
        onUpload();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="input-group">
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".csv"
                />
                <button className="btn btn-primary" type="submit">
                    Upload CSV
                </button>
            </div>
        </form>
    );
}
