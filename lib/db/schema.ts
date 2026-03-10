import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"),
  name: text("name"),
  isPro: boolean("is_pro").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  // BURAYI DÜZELTTİK: users.id text olduğu için bu da text olmalı!
  userId: text("user_id").references(() => users.id), 
  name: text("name").notNull(),
  framework: text("framework").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});