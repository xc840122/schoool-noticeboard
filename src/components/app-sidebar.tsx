"use client"

import * as React from "react"
import {
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Peter",
    email: "peter@example.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Class Management",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Messages",
          url: "/messages",
        },
        {
          title: "Lessons",
          url: "/lessons",
        },
        {
          title: "Students",
          url: "/students",
        },
      ],
    },
    {
      title: "Sport Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Football",
          url: "#",
        },
        {
          title: "Rugby",
          url: "#",
        },
        {
          title: "Swimming",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Teachers",
          url: "#",
        },
        {
          title: "Students",
          url: "#",
        },
        {
          title: "Admins",
          url: "#",
        },
        {
          title: "Parents",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
