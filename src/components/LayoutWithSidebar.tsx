'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SidebarHorizontal from "./HorizontalSideBar/HorizontalSideBar";

const SIDEBAR_ROUTES = ["/dashboard", "/profile", "/statistics"];

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(SIDEBAR_ROUTES.some(route => pathname.startsWith(route)));
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen">
      <main className={`flex-1 overflow-auto ${showSidebar ? 'pb-16' : ''}`}>
        {children}
      </main>
      {showSidebar && (
        <footer className="h-16 bg-gray-800 fixed bottom-0 left-0 right-0">
          <SidebarHorizontal />
        </footer>
      )}
    </div>
  );
}
