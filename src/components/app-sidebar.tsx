"use client"

import * as React from "react"
import {
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
import { useUser } from "@clerk/nextjs"

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
          url: "/messages",
        },
        {
          title: "Students",
          url: "/messages",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.username ?? '',
          email: user?.primaryEmailAddress?.emailAddress ?? '',
          avatar: user?.imageUrl ?? '',
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
