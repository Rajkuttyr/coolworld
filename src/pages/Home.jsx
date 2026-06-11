import { useEffect, useRef, useState } from 'react';
import api from '../api/axios';
import RecordTable from '../components/RecordTable';

export default function Home() {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const allRecords = useRef([]);

  useEffect(() => {
    api.get('/all')
      .then(r => {
        const data = Array.isArray(r.data) ? r.data : [];
        allRecords.current = data;
        setRecords(data);
        setFiltered(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const search = e => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) { setFiltered(allRecords.current); return; }
    const lower = q.toLowerCase();
    setFiltered(allRecords.current.filter(r =>
      r.vNo?.toLowerCase().includes(lower) ||
      String(r.pNum).includes(q)
    ));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-indigo-700">CoolWorld</h1>
        <input
          value={query} onChange={search}
          placeholder="Search by vehicle no or phone..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      {loading
        ? <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
        : <RecordTable records={filtered} />
      }
    </div>
  );
}
