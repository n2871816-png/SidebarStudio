import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  Bot,
  Mic,
  MessageCircle,
  GitBranch,
  Megaphone,
  Phone,
  Mail,
  MessageSquare,
  Workflow,
  Users,
  PlayCircle,
  FileText,
  BarChart3,
  TrendingUp,
  PieChart,
  DollarSign,
  Target,
  ShoppingBag,
  Smartphone,
  Building2,
  Calendar,
  Settings,
  CreditCard,
  HelpCircle,
} from "lucide-react";
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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  items?: SidebarItem[];
}

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: Bot,
    items: [
      {
        title: "Build Voice Agent",
        url: "/agents/voice",
        icon: Mic,
      },
      {
        title: "Build Chat Agent",
        url: "/agents/chat",
        icon: MessageCircle,
      },
      {
        title: "Multi-Agent Orchestration",
        url: "/agents/orchestration",
        icon: GitBranch,
      },
    ],
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: Megaphone,
    items: [
      {
        title: "Batch Calls",
        url: "/campaigns/batch",
        icon: Phone,
      },
      {
        title: "WhatsApp Campaigns",
        url: "/campaigns/whatsapp",
        icon: MessageSquare,
      },
      {
        title: "Email Campaigns",
        url: "/campaigns/email",
        icon: Mail,
      },
      {
        title: "Drip Workflows",
        url: "/campaigns/drip",
        icon: Workflow,
      },
    ],
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: Users,
    items: [
      {
        title: "Live Calls & Chats",
        url: "/conversations/live",
        icon: PlayCircle,
      },
      {
        title: "Recordings & Transcripts",
        url: "/conversations/recordings",
        icon: FileText,
      },
      {
        title: "Post-Call Analytics",
        url: "/conversations/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: TrendingUp,
    items: [
      {
        title: "Voice AI Metrics",
        url: "/analytics/voice",
        icon: Mic,
      },
      {
        title: "Chat AI Metrics",
        url: "/analytics/chat",
        icon: MessageCircle,
      },
      {
        title: "Lead Gen Performance",
        url: "/analytics/leads",
        icon: Target,
      },
      {
        title: "Revenue & ROI Tracking",
        url: "/analytics/revenue",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: PieChart,
    items: [
      {
        title: "Shopify",
        url: "/integrations/shopify",
        icon: ShoppingBag,
      },
      {
        title: "WhatsApp",
        url: "/integrations/whatsapp",
        icon: Smartphone,
      },
      {
        title: "Salesforce",
        url: "/integrations/salesforce",
        icon: Building2,
      },
      {
        title: "Zoho",
        url: "/integrations/zoho",
        icon: Building2,
      },
      {
        title: "Email & Calendar",
        url: "/integrations/email",
        icon: Calendar,
      },
    ],
  },
  {
    title: "System",
    url: "/system",
    icon: Settings,
    items: [
      {
        title: "Billing",
        url: "/system/billing",
        icon: CreditCard,
      },
      {
        title: "Settings",
        url: "/system/settings",
        icon: Settings,
      },
      {
        title: "Help Center",
        url: "/system/help",
        icon: HelpCircle,
      },
    ],
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const [openItems, setOpenItems] = useState<string[]>(["Agents", "Campaigns", "Conversations", "Analytics", "Integrations", "System"]);

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-sidebar-primary">
            AI Agent Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton data-testid={`button-sidebar-${item.title.toLowerCase()}`} className="group">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={location === subItem.url}>
                                <Link href={subItem.url} data-testid={`link-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}