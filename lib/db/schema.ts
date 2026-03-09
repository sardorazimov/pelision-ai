// src/db/schema.ts
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

// ## Kullanıcılar Tablosu (Starter / Pro ayrımını burada tutacağız)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  isPro: boolean("is_pro").default(false), // Premium paketi alanlar için
  createdAt: timestamp("created_at").defaultNow(),
});

// ## Projeler Tablosu (JS, TS, Rust, C++ projeleri)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  name: text("name").notNull(),
  framework: text("framework").notNull(), // Örn: "nextjs", "rust", "react-native"
  createdAt: timestamp("created_at").defaultNow(),
});