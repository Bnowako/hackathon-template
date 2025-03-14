"use client"

import {
  Frame,
  GalleryVerticalEnd,
  SquareTerminal
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "hackathon-template",
    email: "htemplate@example.com",
  },
  teams: [
    {
      name: "Hackathon template",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Example",
          url: "/example",
        },
       
      ],
    },
    {
      title: "LLM",
      url: "/",
      icon: Frame,
      isActive: true,
      items: [
        {
          title: "Chat",
          url: "/chat",
        },
       
      ],
    },
  ],
  projects: [
    {
      name: "Chat",
      url: "/chat",
      icon: Frame,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
