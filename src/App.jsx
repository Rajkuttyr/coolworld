import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRegister from './pages/AddRegister';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddRegister />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
