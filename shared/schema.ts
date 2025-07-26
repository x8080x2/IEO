import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  streetAddress: text("street_address"),
  zip: text("zip"),
  city: text("city"),
  state: text("state").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  ethnicity: text("ethnicity").notNull(),
  citizenshipStatus: text("citizenship_status").notNull(),
  employmentStatus: text("employment_status").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  monthlyIncome: integer("monthly_income").notNull(),
  housingStatus: text("housing_status").notNull(),
  fundingType: text("funding_type").notNull(),
  grantAmount: text("grant_amount").notNull(),
  purposeDescription: text("purpose_description").notNull(),
  referredBy: text("referred_by").notNull(),
  driverLicenseFront: text("driver_license_front"),
  driverLicenseBack: text("driver_license_back"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;
