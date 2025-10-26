import { SidebarProvider, SidebarTrigger, SidebarInset } from "./components/high_level/sidebar"
import { AppSidebar } from "./components/high_level/app-sidebar"
import { Home, LayoutGrid, Settings, Sun, Moon } from "lucide-react"

const items = [
  {to : "/crs", icon : Home, label: "CRS"},
  {to : "/app2", icon : LayoutGrid, label: "App2"},
  {to : "/settings", icon : Settings, label: "Settings"}
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items}/>
      <SidebarInset>
        <div className="flex h-full w-full flex-col p-4 md:p-6">
          <div className="mb-4"><SidebarTrigger /></div>
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
