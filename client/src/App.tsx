import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import DashboardPage from "@/pages/dashboard";
import AgentsPage from "@/pages/agents";
import CampaignsPage from "@/pages/campaigns";
import ConversationsPage from "@/pages/conversations";
import AnalyticsPage from "@/pages/analytics";
import IntegrationsPage from "@/pages/integrations";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/agents" component={AgentsPage} />
      <Route path="/agents/:type" component={AgentsPage} />
      <Route path="/campaigns" component={CampaignsPage} />
      <Route path="/campaigns/:type" component={CampaignsPage} />
      <Route path="/conversations" component={ConversationsPage} />
      <Route path="/conversations/:type" component={ConversationsPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/analytics/:type" component={AnalyticsPage} />
      <Route path="/integrations" component={IntegrationsPage} />
      <Route path="/integrations/:type" component={IntegrationsPage} />
      <Route path="/system/:type" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto p-6 bg-background">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
