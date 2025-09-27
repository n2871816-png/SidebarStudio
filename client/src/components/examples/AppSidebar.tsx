import { AppSidebar } from '../AppSidebar';
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6 bg-background">
          <div className="text-foreground">
            <h1 className="text-2xl font-semibold mb-4">AI Agent Platform</h1>
            <p className="text-muted-foreground">
              Click on the sidebar items to navigate through different sections of the platform.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}