import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-[100dvh] w-full bg-primary-100 flex flex-col items-center justify-center p-4 md:p-8 min-w-[800px]">
      <div className="card-neobrutalism w-full max-w-[800px] flex flex-col items-center justify-center p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black hover:text-primary-600 transition-colors">
          英文打字遊戲
        </h1>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
