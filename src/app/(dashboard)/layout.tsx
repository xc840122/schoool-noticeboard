// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider >
      <div className="flex w-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <main>{children}</main>
          <Toaster />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}