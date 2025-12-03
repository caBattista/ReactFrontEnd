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
    SidebarTrigger,
} from "@/components/high_level/sidebar"
import { Settings, User } from "lucide-react"
import { navigate, getPath } from "@/lib/router"

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

function FooterLink({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<any>; label: string }) {
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
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarGroup>
					<div className="flex items-center gap-2">
						<SidebarTrigger />
						<SidebarGroupLabel className="text-base font-semibold">CRS</SidebarGroupLabel>
					</div>
				</SidebarGroup>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => <NavLink to={item.to} icon={item.icon} label={item.label} />)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
			</SidebarContent>
			<SidebarFooter>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{/* Account on top of Settings */}
							<FooterLink to="/account" icon={User} label="Account" />
							<FooterLink to="/settings" icon={Settings} label="Settings" />
						</SidebarMenu>
						</SidebarGroupContent>
				</SidebarGroup>
				</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar