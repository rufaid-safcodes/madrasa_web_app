import React, { useState, useEffect } from "react";
import {
  Calendar,
  Home,
  Search,
  Settings,
  Users,
  Users2,
  Users2Icon,
  ChevronDown,
  CreditCard,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users2,
    list: [
      { name: "Manage Students", url: "/students" },
      { name: "Add Student", url: "/students/add-students" },
      { name: "Bulk Upload", url: "/students/students-bulk-upload" },
    ],
  },
  {
    title: "Classrooms",
    url: "/classrooms",
    icon: Calendar,
    list: [
      { name: "Classrooms", url: "/classrooms" },
      { name: "Timetable Classes", url: "/classrooms/timetable-classes" },
      { name: "Subjects", url: "/subjects" },
      { name: "Class Modes", url: "/batches" },
      // {
      //   name: "Assign Students to Classrooms",
      //   url: "/classrooms/assign-students-to-classrooms",
      // }
    ],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Search,
    list: [
      { name: "Take Attendance", url: "/attendance" },
      { name: "Edit Attendance", url: "/edit-attendance" },
      { name: "Attendance Reports", url: "/attendance-reports" },
    ],
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: Users,
    list: [
      { name: "Manage Teachers", url: "/teachers" },
      { name: "Add Teacher", url: "/teachers/add-teachers" },
      { name: "Departments", url: "/departments" },
    ],
  },
  {
    title: "Staffs",
    url: "/staffs/accounts",
    icon: Users2Icon,
    list: [
      { name: "Manage Accounts Staff", url: "/staffs/accounts" },
      { name: "Add Accounts Staff", url: "/staffs/add-staffs" },
    ],
  },
  {
    title: "Accounts and Fees",
    url: "/accounts",
    icon: CreditCard,
    list: [
      { name: "Due Fees", url: "/due-fees" },
      { name: "Transactions", url: "/transactions" },
      { name: "Fee Settings", url: "/fee-settings" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    list: [
      { name: "General Settings", url: "/settings/general-settings" },
      { name: "Academic Year", url: "/settings/academic-year" },
      { name: "User/Roles", url: "/settings/user-roles" },
      { name: "Backup/Import/Export", url: "/settings/backup-import-export" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { state } = useSidebar();

  // Auto-expand parent menu if child is active
  useEffect(() => {
    const activeItem = items.find((item) =>
      item.list?.some((subItem) => subItem.url === location.pathname)
    );

    if (activeItem && !expandedItems.includes(activeItem.title)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedItems((prev) => [...prev, activeItem.title]);
    }
  }, [location.pathname]);

  const handleExpand = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-[#151529]!">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 group-data-[collapsible=icon]:opacity-0">
            <div>
              <p className="text-white text-[24px]">LOGO</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => {
                const isActive = item.list
                  ? item.list.some((sub) => sub.url === location.pathname)
                  : location.pathname === item.url;
                const isExpanded = expandedItems.includes(item.title);

                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        tooltip={state === "collapsed" ? item.title : undefined}
                        isActive={isActive}
                        className="data-[active=true]:bg-white! data-[active=true]:text-black! hover:bg-white! hover:text-black! text-white!"
                      >
                        <NavLink
                          to={item.url}
                          end={!item.list}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.list && state === "expanded" && (
                            <ChevronDown
                              onClick={(e) => handleExpand(e, item.title)}
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {item.list && isExpanded && state === "expanded" && (
                      <SidebarMenuSub>
                        {item.list.map((sub) => (
                          <SidebarMenuSubItem key={sub.name}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === sub.url}
                              className="data-[active=true]:bg-white! data-[active=true]:text-black! hover:bg-white! hover:text-black! text-white!"
                            >
                              <NavLink to={sub.url} end>
                                {sub.name}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
