import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/add', label: 'Add Register' },
  { to: '/search', label: 'Search' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-indigo-700 text-white md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold text-lg">CoolWorld</span>
        <button onClick={() => setOpen(!open)}>{open ? <XIcon /> : <MenuIcon />}</button>
      </div>
      {open && (
        <ul className="flex flex-col border-t border-indigo-600">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 hover:bg-indigo-600 ${isActive ? 'bg-indigo-800 font-semibold' : ''}`
                }
              >{l.label}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
