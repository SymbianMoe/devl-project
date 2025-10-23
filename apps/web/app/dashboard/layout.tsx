import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Footer } from '@/components/layout/footer';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-[calc(100vh-73px)]">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
