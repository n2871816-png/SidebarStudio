import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ShoppingBag, 
  Smartphone, 
  Building2, 
  Calendar, 
  Mail, 
  Search, 
  Check, 
  AlertCircle,
  Settings,
  ExternalLink
} from "lucide-react";
import { SiShopify, SiWhatsapp, SiSalesforce, SiZoho, SiGmail } from "react-icons/si";
import type { Integration } from "@shared/schema";

// Mock data
const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Shopify",
    type: "shopify",
    connected: true,
    description: "Sync leads directly from Shopify abandoned carts and customer data",
    lastSync: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    name: "WhatsApp Business",
    type: "whatsapp",
    connected: true,
    description: "Send automated messages and manage WhatsApp campaigns",
    lastSync: new Date("2024-01-15T11:45:00"),
  },
  {
    id: "3",
    name: "Salesforce",
    type: "salesforce",
    connected: false,
    description: "Bidirectional sync with Salesforce CRM for leads and opportunities",
    lastSync: null,
  },
  {
    id: "4",
    name: "Zoho CRM",
    type: "zoho",
    connected: false,
    description: "Integrate with Zoho CRM for comprehensive lead management",
    lastSync: null,
  },
  {
    id: "5",
    name: "Google Workspace",
    type: "email",
    connected: true,
    description: "Connect Gmail and Google Calendar for email campaigns and scheduling",
    lastSync: new Date("2024-01-15T09:15:00"),
  },
];

function getIntegrationIcon(type: string, className: string = "h-8 w-8") {
  switch (type) {
    case "shopify":
      return <SiShopify className={className} />;
    case "whatsapp":
      return <SiWhatsapp className={className} />;
    case "salesforce":
      return <SiSalesforce className={className} />;
    case "zoho":
      return <SiZoho className={className} />;
    case "email":
      return <SiGmail className={className} />;
    default:
      return <Building2 className={className} />;
  }
}

function IntegrationCard({ integration }: { integration: Integration }) {
  const [isConnected, setIsConnected] = useState(integration.connected || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    console.log(`${isConnected ? 'Disconnecting' : 'Connecting'} ${integration.name}`);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsLoading(false);
    }, 1000);
  };

  const handleConfigure = () => {
    console.log(`Configuring ${integration.name}`);
  };

  const handleViewDocs = () => {
    console.log(`Opening documentation for ${integration.name}`);
  };

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-integration-${integration.type}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              {getIntegrationIcon(integration.type)}
            </div>
            <div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {isConnected ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Switch
            checked={isConnected}
            onCheckedChange={handleConnect}
            disabled={isLoading}
            data-testid={`switch-${integration.type}`}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {integration.description || "No description available"}
        </CardDescription>
        
        {isConnected && integration.lastSync && (
          <div className="text-xs text-muted-foreground">
            Last synced: {integration.lastSync.toLocaleString()}
          </div>
        )}

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={isConnected ? "default" : "outline"}
                  onClick={handleConnect}
                  disabled={isLoading}
                  data-testid={`button-connect-${integration.type}`}
                  className="flex-1"
                >
                  {isLoading ? "..." : isConnected ? "Disconnect" : "Connect Now"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isConnected ? `Disconnect from ${integration.name}` : `Connect to ${integration.name}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {isConnected && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleConfigure}
              data-testid={`button-configure-${integration.type}`}
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleViewDocs}
            data-testid={`button-docs-${integration.type}`}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function IntegrationHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [integrations] = useState(mockIntegrations);

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (integration.description && integration.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6" data-testid="integration-hub">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Integration Hub</h2>
          <p className="text-muted-foreground">
            Connect your favorite tools and services to enhance your AI agent capabilities
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{connectedCount}/{integrations.length}</div>
          <div className="text-sm text-muted-foreground">Connected</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search integrations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-integrations"
        />
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No integrations found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all available integrations.
          </p>
        </div>
      )}
    </div>
  );
}