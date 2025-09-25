import { pgTable, text, timestamp, boolean, uuid, integer, unique } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Tables above this comment were built by 'Better Auth' for their service

export const resume = pgTable("resume", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  resumeContent: text("resume_content"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
}, (t) => [
  unique().on(t.userId, t.name)
])

export const fit = pgTable("fit", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id").notNull().references(() => resume.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull().default(""),
  applicationUrl: text("application_url"),
  jobDescription: text("job_description").notNull(),
  fitScore: integer("fit_score").notNull(),
  goodPoints: text("good_points").array().notNull(),
  poorPoints: text("poor_points").array().notNull(),
  tracked: boolean("tracked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

export const application = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id").references(() => resume.id),
  role: text("role").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull().default(""),
  jobDescription: text("job_description").notNull().default(""),
  applicationUrl: text("application_url"),
  dateAdded: timestamp("date_added").notNull().defaultNow(),
  dateApplied: timestamp("date_applied"),
  dateResponded: timestamp("date_responded"),
  dateInterviewed: timestamp("date_interviewed"),
  dateAccepted: timestamp("date_accepted"),
  dateClosed: timestamp("date_closed")
})

export const schema = {
  user,
  session,
  account,
  verification,
  // Tables above this comment were built by 'Better Auth' for their service
  resume,
  fit,
  application
}