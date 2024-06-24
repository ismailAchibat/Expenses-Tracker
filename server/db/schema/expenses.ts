import { date, index, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';


export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  amount: numeric("amount", {precision: 12, scale: 2}).notNull(),
  date: date('date').notNull(),
  createdAt: timestamp('created_at').defaultNow()
}, (expenses) => {
  return {
    userIdIndex: index('name_idx').on(expenses.userId),
  }
});

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses,{
  id: z.number().int().positive(),
  title: z.string().min(3,{message: 'Title must be at least 3 characters'}).max(100, {message: 'Title must be at most 100 characters'}),
  amount: z.string().regex(/^\d*\.?\d+$/, {message: "Amount must be a positive number"})
});
 // Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);