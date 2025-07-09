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

    const fetchData = async () => {
        const res = await getRecords();
        setRecords(res.data);
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

            <table className="table table-bordered">
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
                            <td>{r.email}</td>
                            <td>
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
        </>
    );
}
