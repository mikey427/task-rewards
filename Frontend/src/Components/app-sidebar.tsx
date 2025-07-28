import {
  Calendar,
  Home,
  ListChecks,
  Gamepad2,
  Settings,
  Settings2,
  ChartLine,
  ShieldUser,
  User2,
  ChevronUp,
  History,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

// Menu items.
const items = [
  {
    title: "Chores",
    url: "#",
    icon: ListChecks,
  },
  {
    title: "Shop",
    url: "#",
    icon: Gamepad2,
  },
  {
    title: "History",
    url: "#",
    icon: History,
  },
  {
    title: "Parental",
    url: "#",
    icon: ShieldUser,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartLine,
  },
  {
    title: "Manage Chores/Shop",
    url: "#",
    icon: Settings2,
  },
  {
    title: "Account Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>TimeToken</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <div>
            <span>Balance: [Placeholder]</span>
          </div>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.Email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={logout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
