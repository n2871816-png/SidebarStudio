import { ConversationMonitor } from "@/components/ConversationMonitor";

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Conversations</h1>
        <p className="text-muted-foreground">
          Monitor live calls and chats with real-time transcripts and analytics
        </p>
      </div>
      <ConversationMonitor />
    </div>
  );
}