import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/add', label: 'Add Register' },
  { to: '/search', label: 'Search' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-indigo-700 text-white min-h-screen">
      <div className="px-6 py-5 text-xl font-bold border-b border-indigo-600">Vehicle Service</div>
      <ul className="flex flex-col mt-4 gap-1 px-3">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg hover:bg-indigo-600 transition ${isActive ? 'bg-indigo-800 font-semibold' : ''}`
              }
            >{l.label}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
