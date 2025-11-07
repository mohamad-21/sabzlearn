import { relations } from "drizzle-orm/relations";
import { users, accounts, categories, courses } from "./schema";

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(accounts),
}));

export const coursesRelations = relations(courses, ({one}) => ({
	category: one(categories, {
		fields: [courses.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	courses: many(courses),
}));