import * as React from "react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/high_level/sidebar"
import { Button } from "@/components/low_level/button"
import { Home, LayoutGrid, Settings, Sun, Moon } from "lucide-react"
import { navigate, getPath } from "@/lib/router"

function useTheme() {
	const [isDark, setIsDark] = React.useState<boolean>(() =>
		typeof document !== "undefined"
			? document.documentElement.classList.contains("dark")
			: false
	)

	const toggle = React.useCallback(() => {
		const root = document.documentElement
		const nextIsDark = !root.classList.contains("dark")
		root.classList.toggle("dark", nextIsDark)
		localStorage.setItem("theme", nextIsDark ? "dark" : "light")
		setIsDark(nextIsDark)
	}, [])

	return { isDark, toggle }
}

function NavLink({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<any>; label: string }) {
	const [active, setActive] = React.useState<boolean>(false)

	React.useEffect(() => {
		const update = () => setActive(getPath() === to)
		update()
		window.addEventListener("popstate", update)
		return () => window.removeEventListener("popstate", update)
	}, [to])

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				isActive={active}
				tooltip={label}
				onClick={(e) => {
					e.preventDefault()
					navigate(to)
				}}
			>
				<Icon />
				<span>{label}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

type SidebarItem = {
  to: string
  icon: any
  label: string
}

type SidebarProps = {
  items: SidebarItem[]
}

export function AppSidebar({
  items,
}: SidebarProps) {
	const { isDark, toggle } = useTheme()
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupLabel className="text-base font-semibold">CRS</SidebarGroupLabel>
				</SidebarGroup>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => <NavLink to={item.to} icon={item.icon} label={item.label} />)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
			</SidebarContent>
			<SidebarFooter>
				<Button variant="outline" size="sm" onClick={toggle} className="w-full justify-start">
					{isDark ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
					{isDark ? "Light mode" : "Dark mode"}
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar