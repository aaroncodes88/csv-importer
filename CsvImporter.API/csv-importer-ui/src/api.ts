import axios from 'axios';

const API_URL = 'https://localhost:5001/api/CsvUpload'; // replace PORT with your backend port

export const uploadCsv = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/upload`, formData);
};

export const getRecords = () => axios.get(API_URL);

export const deleteRecord = (id: number) =>
    axios.delete(`${API_URL}/${id}`);

export const clearAllRecords = () =>
    axios.delete(`${API_URL}/clear-all`);
