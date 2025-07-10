import { useState, useEffect, useRef } from 'react';
import { uploadCsv } from '../api';

export default function FileUpload({ onUpload }: { onUpload: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            await uploadCsv(file);
            setFile(null);
            fileInputRef.current!.value = '';
            onUpload();
            setToast({ message: 'Upload successful!', type: 'success' });
        } catch (error) {
            console.error('Upload failed:', error);
            setToast({ message: 'Upload failed. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        accept=".csv"
                    />
                    <button className="btn btn-primary" type="submit" disabled={!file || loading}>
                        {loading ? 'Uploading...' : 'Upload CSV'}
                    </button>
                </div>
            </form>

            {toast && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem',
                        padding: '1rem 1.5rem',
                        color: toast.type === 'success' ? 'white' : 'white',
                        backgroundColor: toast.type === 'success' ? 'green' : 'red',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        zIndex: 9999,
                    }}
                >
                    {toast.message}
                </div>
            )}
        </>
    );
}
