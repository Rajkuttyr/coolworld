const fmt = d => d ? d.split('-').reverse().join('-') : '-';

export default function RecordCard({ record: r }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-indigo-100">
      <div className="flex justify-between items-center mb-3">
        <span className="text-indigo-700 font-bold text-lg">{r.vNo}</span>
        <span className="text-xs text-gray-400">{fmt(r.date)}</span>
      </div>
      <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
        <span className="font-medium">Customer</span><span>{r.Cname}</span>
        <span className="font-medium">Phone</span><span>{r.pNum}</span>
        <span className="font-medium">Complaint</span><span>{r.complaint}</span>
        <span className="font-medium">Amount</span><span>₹{r.amount?.toFixed(2)}</span>
        <span className="font-medium">Remark</span><span>{r.remark}</span>
      </div>
    </div>
  );
}
