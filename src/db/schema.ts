import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, datetime, varchar, foreignKey, float, text, mysqlEnum, boolean, tinyint, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

const date = new Date();
date.setMonth(new Date().getMonth() + 30);

export const cart = mysqlTable("carts", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const categories = mysqlTable("categories", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const courses = mysqlTable("courses", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	cover: varchar({ length: 255 }).notNull(),
	previewVideo: varchar("preview_video", { length: 255 }).notNull(),
	price: float().notNull(),
	discountPercent: float("discount_percent").notNull(),
	status: varchar({ length: 255 }).default('\'در حال برگذاری\'').notNull(),
	duration: varchar({ length: 255 }).notNull(),
	supportMode: varchar("support_mode", { length: 255 }).default('\'آنلاین\'').notNull(),
	requirement: varchar({ length: 255 }).default('\'ندارد\'').notNull(),
	tutorialMode: varchar("tutorial_mode", { length: 255 }).default('\'آنلاین\'').notNull(),
	completePercent: int("complete_percent").default(0).notNull(),
	content: text().notNull(),
	tags: varchar({ length: 255 }).notNull(),
	categoryId: int("category_id").notNull().references(() => categories.id, { onDelete: "cascade", onUpdate: "cascade" }),
	teacherId: varchar("teacher_id", { length: 255 }).notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const courseLessons = mysqlTable("course_lessons", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	videoUrl: varchar("video_url", { length: 255 }).notNull(),
	duration: varchar({ length: 255 }).notNull(),
	courseId: int("course_id").notNull(),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const courseSeasons = mysqlTable("course_seasons", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const students = mysqlTable("students", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").notNull().references(() => courses.id, { onDelete: "cascade", onUpdate: "cascade" }),
	studentId: varchar("student_id", { length: 255 }).notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});


export const teachersInfo = mysqlTable("teachers_info", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	bio: varchar({ length: 255 }).notNull(),
	image: varchar({ length: 255 }).default('\'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg\'').notNull(),
	telegramId: varchar("telegram_id", { length: 255 }).default('NULL'),
	githubId: varchar("github_id", { length: 255 }).default('NULL'),
	instagramId: varchar("instagram_id", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	role: mysqlEnum(['user', 'teacher']).default('user'),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 36 }).notNull(),
	expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
	token: varchar("token", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: varchar("user_id", { length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = mysqlTable("accounts", {
	id: varchar("id", { length: 36 }),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: varchar("user_id", { length: 36 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3 }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3 }).default(date),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const verifications = mysqlTable("verifications", {
	id: varchar("id", { length: 36 }).notNull(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3 })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});