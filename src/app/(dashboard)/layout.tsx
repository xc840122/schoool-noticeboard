// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}