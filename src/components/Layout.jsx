import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
