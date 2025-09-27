import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Pause, Download, Volume2, Clock, Heart, MessageSquare, Phone, User, Bot } from "lucide-react";
import type { Conversation } from "@shared/schema";

// Mock data
const mockConversation: Conversation = {
  id: "1",
  agentId: "agent-1",
  type: "call",
  status: "completed",
  duration: 245, // seconds
  sentiment: "positive",
  csatScore: 8,
  leadStatus: "qualified",
  transcript: `Agent: Hello! Thank you for your interest in our services. How can I help you today?

Customer: Hi, I saw your ad about the marketing automation platform. I'm running a small business and looking for ways to streamline our customer outreach.

Agent: That's perfect! Our platform is specifically designed for businesses like yours. Can you tell me a bit about your current marketing processes?

Customer: We mainly use email marketing right now, but it's pretty manual. We have about 500 customers and send newsletters monthly.

Agent: I see the potential there. With our automation, you could personalize those campaigns and increase engagement significantly. Would you be interested in a demo this week?

Customer: Yes, that sounds great. What would the pricing look like for our size?

Agent: For 500 contacts, our Professional plan at $199/month would be perfect. It includes everything you need plus advanced analytics.

Customer: That's within our budget. Let's schedule that demo.

Agent: Wonderful! I'll send you a calendar link right after this call. Is your email still jane.smith@example.com?

Customer: Yes, that's correct.

Agent: Perfect! You'll receive the demo link within the next few minutes. Thank you for your time today!`,
  summary: "Customer interested in marketing automation platform. Qualified lead with 500+ contacts, budget confirmed at $199/month. Demo scheduled for this week.",
  createdAt: new Date("2024-01-15T14:30:00"),
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return "text-green-600";
    case "negative":
      return "text-red-600";
    case "neutral":
      return "text-yellow-600";
    default:
      return "text-muted-foreground";
  }
}

function getLeadStatusColor(status: string) {
  switch (status) {
    case "qualified":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "disqualified":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function TranscriptView({ conversation }: { conversation: Conversation }) {
  const transcriptLines = conversation.transcript?.split('\n').filter(line => line.trim()) || [];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Live Transcript
        </CardTitle>
        <CardDescription>Real-time conversation transcript</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="space-y-3">
            {transcriptLines.map((line, index) => {
              const isAgent = line.startsWith('Agent:');
              const isCustomer = line.startsWith('Customer:');
              const text = line.replace(/^(Agent:|Customer:)\s*/, '');
              
              if (!isAgent && !isCustomer) {
                return (
                  <div key={index} className="text-sm text-muted-foreground italic">
                    {line}
                  </div>
                );
              }
              
              return (
                <div key={index} className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className={isAgent ? "bg-primary text-primary-foreground" : "bg-muted"}>
                      {isAgent ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {isAgent ? "AI Agent" : "Customer"}
                    </div>
                    <div className="text-sm text-foreground bg-muted p-3 rounded-lg">
                      {text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function CallMetadata({ conversation }: { conversation: Conversation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(75);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing" : "Playing", "recording");
  };

  const downloadRecording = () => {
    console.log("Downloading recording for conversation:", conversation.id);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Call Metadata
        </CardTitle>
        <CardDescription>Call details and analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Player */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recording Playback</span>
            <Button
              size="icon"
              variant="outline"
              onClick={downloadRecording}
              data-testid="button-download-recording"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={togglePlayback}
              data-testid="button-play-recording"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3:05</span>
                <span>{formatDuration(conversation.duration || 0)}</span>
              </div>
            </div>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <Separator />

        {/* Call Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Duration</div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(conversation.duration || 0)}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Sentiment</div>
              <div className={`flex items-center gap-1 ${getSentimentColor(conversation.sentiment || 'neutral')}`}>
                <Heart className="h-4 w-4" />
                <span className="capitalize">{conversation.sentiment}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">CSAT Score</div>
            <div className="flex items-center gap-2">
              <Progress value={(conversation.csatScore || 0) * 10} className="h-2 flex-1" />
              <span className="text-sm font-bold">{conversation.csatScore}/10</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Lead Status</div>
            <Badge variant="secondary" className={getLeadStatusColor(conversation.leadStatus || 'pending')}>
              {conversation.leadStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* AI Summary */}
        <div>
          <div className="text-sm font-medium mb-2">AI Summary</div>
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            {conversation.summary}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ConversationMonitor() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" data-testid="conversation-monitor">
      <div className="lg:col-span-3">
        <TranscriptView conversation={mockConversation} />
      </div>
      <div className="lg:col-span-2">
        <CallMetadata conversation={mockConversation} />
      </div>
    </div>
  );
}