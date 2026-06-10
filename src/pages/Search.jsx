import { useState } from 'react';
import api from '../api/axios';
import RecordCard from '../components/RecordCard';

export default function Search() {
  const [type, setType] = useState('vno');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const url = type === 'vno' ? `/vno?vno=${encodeURIComponent(query)}` : `/pnum?pnum=${encodeURIComponent(query)}`;
      const r = await api.get(url);
      if (!r.data) { setResults([]); return; }
      setResults(Array.isArray(r.data) ? r.data : [r.data]);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = e => {
    setType(e.target.value);
    setQuery('');
    setResults(null);
    setSearched(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-indigo-700">Search Records</h1>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <select
          value={type} onChange={handleTypeChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="vno">Vehicle Number</option>
          <option value="pnum">Phone Number</option>
        </select>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
          placeholder={type === 'vno' ? 'Enter vehicle number...' : 'Enter phone number...'}
          inputMode={type === 'pnum' ? 'numeric' : 'text'}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >Search</button>
      </form>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && searched && results !== null && (
        results.length === 0
          ? <p className="text-center text-gray-500 py-10">No records found.</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((r, i) => <RecordCard key={i} record={r} />)}
            </div>
      )}
    </div>
  );
}
