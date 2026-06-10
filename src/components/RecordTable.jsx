const fmt = d => d ? d.split('-').reverse().join('-') : '-';

export default function RecordTable({ records }) {
  if (!records.length)
    return <p className="text-center text-gray-500 py-10">No records found.</p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            {['Vehicle No','Date','Customer','Phone','Complaint','Amount (₹)','Remark'].map(h => (
              <th key={h} className="px-4 py-3 text-left whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}>
              <td className="px-4 py-2 font-medium text-indigo-700">{r.vNo}</td>
              <td className="px-4 py-2 whitespace-nowrap">{fmt(r.date)}</td>
              <td className="px-4 py-2">{r.Cname}</td>
              <td className="px-4 py-2">{r.pNum}</td>
              <td className="px-4 py-2">{r.complaint}</td>
              <td className="px-4 py-2">{r.amount?.toFixed(2)}</td>
              <td className="px-4 py-2">{r.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
