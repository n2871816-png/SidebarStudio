import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'voice' | 'chat'
  status: text("status").notNull(), // 'active' | 'inactive' | 'training'
  languages: text("languages").array(),
  campaignAssigned: text("campaign_assigned"),
  lastActive: timestamp("last_active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'batch_calls' | 'whatsapp' | 'email' | 'drip'
  status: text("status").notNull(), // 'running' | 'completed' | 'paused'
  callsAttempted: integer("calls_attempted").default(0),
  callsAnswered: integer("calls_answered").default(0),
  callsUnanswered: integer("calls_unanswered").default(0),
  roiPercentage: real("roi_percentage").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: text("agent_id").notNull(),
  type: text("type").notNull(), // 'call' | 'chat'
  status: text("status").notNull(), // 'active' | 'completed' | 'escalated'
  duration: integer("duration"), // in seconds
  sentiment: text("sentiment"), // 'positive' | 'neutral' | 'negative'
  csatScore: integer("csat_score"),
  leadStatus: text("lead_status"), // 'qualified' | 'disqualified' | 'pending'
  transcript: text("transcript"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const integrations = pgTable("integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'shopify' | 'whatsapp' | 'salesforce' | 'zoho' | 'email'
  connected: boolean("connected").default(false),
  description: text("description"),
  lastSync: timestamp("last_sync"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertIntegrationSchema = createInsertSchema(integrations).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;