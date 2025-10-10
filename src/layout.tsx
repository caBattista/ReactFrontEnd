import { SidebarProvider, SidebarTrigger, SidebarInset } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full w-full flex-col p-4 md:p-6">
          <div className="mb-4"><SidebarTrigger /></div>
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
