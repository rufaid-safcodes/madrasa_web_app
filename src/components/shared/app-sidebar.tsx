import React, { useState } from "react";
import { Calendar, Home, Search, Settings, Users, Users2, Users2Icon, ChevronDown } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
    ]
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: Users,
    list: [
      { name: "Manage Teachers", url: "/teachers" },
      { name: "Add Teacher", url: "/teachers/add-teachers" },
      { name: "Departments", url: "/teachers/departments" },
    ]
  },
  {
    title: "Staffs",
    url: "/staffs",
    icon: Users2Icon,
    list: [
      { name: "Manage Accounts Staff", url: "/staffs/accounts" }
    ]
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
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
                          end={item.url === "/"}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded-md p-[20px_10px]! transition-colors text-[16px] ${isActive
                              ? "bg-[#fd5d5d] text-white"
                              : "text-gray-700"
                            }`
                          }

                        >
                          <item.icon className="w-10 h-10 shrink-0" />
                          <span>{item.title}</span>
                          {item.list ? (
                            <ChevronDown
                              onClick={(e) => {
                                e.preventDefault();
                                handleExpand(item.title);
                              }}
                              className={`w-5 h-5 ms-auto transition-transform ${expandedItems.includes(item.title)
                                ? "rotate-180"
                                : ""
                                }`}

                            />
                          ) : null}
                        </NavLink>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>

                  {item.list && expandedItems.includes(item.title) && (
                    <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-gray-300 pl-3">
                      {item.list.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.url}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-sm transition-colors ${isActive
                              ? "bg-[#fd5d5d] text-white"
                              : "text-gray-600 hover:bg-[#fd5d5d] hover:text-white"
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
  )
}