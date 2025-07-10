import { useEffect, useState } from 'react';
import { getRecords, deleteRecord, clearAllRecords } from '../api';

type CsvRecord = {
    id: number;
    name: string;
    age: number;
    email: string;
};

export default function CsvTable() {
    const [records, setRecords] = useState<CsvRecord[]>([]);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getRecords();
            setRecords(res.data);
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id: number) => {
        await deleteRecord(id);
        fetchData();
    };

    const handleClearAllRecords = async () => {
        if (!window.confirm('Are you sure you want to delete all records?')) return;
        await clearAllRecords();
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <button className="btn btn-danger mb-3" onClick={handleClearAllRecords}>
                Clear All
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((r) => (
                        <tr key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.age}</td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>{r.email}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(r.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {records.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {records.length > 0 && (
                <div className="text-muted small mt-2">
                    Showing {records.length} record{records.length !== 1 ? 's' : ''}
                </div>
            )}
        </>
    );
}
