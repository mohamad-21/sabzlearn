import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import * as schema from "@/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		schema: {
			cart: schema.cart,
			categories: schema.categories,
			courses: schema.courses,
			courseLessons: schema.courseLessons,
			courseSeasons: schema.courseSeasons,
			students: schema.students,
			users: schema.users,
			accounts: schema.accounts,
			sessions: schema.sessions,
			verifications: schema.verifications
		},
		usePlural: true
	}),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 5
	},
	plugins: [nextCookies()]
})

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: process.env.BASE_URL
})