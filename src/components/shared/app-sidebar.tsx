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
} from "@/components/ui/sidebar";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Search,
  },
  {
    title: "Class Rooms",
    url: "/classrooms",
    icon: Calendar,
  },
  {
    title: "Payments and Fees",
    url: "/payments-and-fees",
    icon: Calendar,
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
    title: "Teachers",
    url: "/teachers",
    icon: Users,
    list: [
      { name: "Manage Teachers", url: "/teachers" },
      { name: "Add Teacher", url: "/teachers/add-teachers" },
      { name: "Departments", url: "/teachers/departments" },
    ],
  },
  {
    title: "Staffs",
    url: "/staffs",
    icon: Users2Icon,
    list: [{ name: "Manage Accounts Staff", url: "/staffs/accounts" }],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Madrassa Management</SidebarGroupLabel>
          {/* <div>
            <SidebarTrigger />
          </div> */}
          <SidebarGroupContent className="p-3">
            <SidebarMenu className=" flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <div className="flex items-center">
                      <SidebarMenuButton asChild className="flex-1">
                        <NavLink
                          to={item.url}
                          end={!item.list}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded-md p-3 transition-colors text-sm font-medium ${
                              isActive && !item.list
                                ? "bg-[#fd5d5d] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                          }
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.list && (
                            <ChevronDown
                              onClick={(e) => handleExpand(e, item.title)}
                              className={`w-4 h-4 transition-transform duration-200 ${
                                expandedItems.includes(item.title)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>

                  {item.list && expandedItems.includes(item.title) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.list.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.url}
                          end
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive
                                ? "bg-[#fd5d5d] text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
