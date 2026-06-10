import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const init = { vNo: '', date: '', Cname: '', pNum: '', complaint: '', amount: '', remark: '' };

function Field({ label, name, value, onChange, type = 'text', ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name} type={type} value={value} onChange={onChange} required
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        {...rest}
      />
    </div>
  );
}

export default function RecordForm() {
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = e => {
    const { name, value } = e.target;
    if (name === 'pNum' && !/^\d*$/.test(value)) return;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async e => {
    e.preventDefault();
    if (form.pNum.length < 10) return toast.error('Phone must be at least 10 digits.');
    setLoading(true);
    try {
      await api.post('/post', { ...form, pNum: Number(form.pNum), amount: Number(form.amount) });
      toast.success('Record added successfully!');
      setForm(init);
      setTimeout(() => navigate('/'), 1000);
    } catch {
      toast.error('Failed to add record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
      <Field label="Vehicle Number" name="vNo" value={form.vNo} onChange={handle} placeholder="e.g. TN01AB1234" />
      <Field label="Date" name="date" type="date" value={form.date} onChange={handle} />
      <Field label="Customer Name" name="Cname" value={form.Cname} onChange={handle} placeholder="Full name" />
      <Field label="Phone Number" name="pNum" value={form.pNum} onChange={handle} placeholder="10-digit number" maxLength={10} inputMode="numeric" />
      <Field label="Complaint" name="complaint" value={form.complaint} onChange={handle} placeholder="Describe the issue" />
      <Field label="Amount (₹)" name="amount" type="number" value={form.amount} onChange={handle} step="0.01" min="0" placeholder="0.00" />
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label className="text-sm font-medium text-gray-700">Remark</label>
        <textarea
          name="remark" value={form.remark} onChange={handle} rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          placeholder="Additional notes..."
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? 'Submitting...' : 'Add Register'}
        </button>
      </div>
    </form>
  );
}
