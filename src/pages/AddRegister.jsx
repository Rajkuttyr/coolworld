import RecordForm from '../components/RecordForm';

export default function AddRegister() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-indigo-700">Add New Register</h1>
      <RecordForm />
    </div>
  );
}
