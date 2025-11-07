import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, varchar, text, int, float, unique, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const accounts = mysqlTable("accounts", {
	id: varchar({ length: 36 }).notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	accessToken: text("access_token").default('NULL'),
	refreshToken: text("refresh_token").default('NULL'),
	idToken: text("id_token").default('NULL'),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3, mode: 'string' }).default('''2028-05-02 17:24:32.455''').notNull(),
	scope: text().default('NULL'),
	password: text().default('NULL'),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const carts = mysqlTable("carts", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const categories = mysqlTable("categories", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const courses = mysqlTable("courses", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	cover: varchar({ length: 255 }).notNull(),
	previewVideo: varchar("preview_video", { length: 255 }).notNull(),
	price: float().notNull(),
	discountPercent: float("discount_percent").notNull(),
	status: varchar({ length: 255 }).default('\'\'\'در حال برگذاری\'\'\'').notNull(),
	duration: varchar({ length: 255 }).notNull(),
	supportMode: varchar("support_mode", { length: 255 }).default('\'\'\'آنلاین\'\'\'').notNull(),
	requirement: varchar({ length: 255 }).default('\'\'\'ندارد\'\'\'').notNull(),
	tutorialMode: varchar("tutorial_mode", { length: 255 }).default('\'\'\'آنلاین\'\'\'').notNull(),
	completePercent: int("complete_percent").notNull(),
	content: text().notNull(),
	tags: varchar({ length: 255 }).notNull(),
	categoryId: int("category_id").notNull().references(() => categories.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	teacherId: varchar("teacher_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const courseLessons = mysqlTable("course_lessons", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	videoUrl: varchar("video_url", { length: 255 }).notNull(),
	duration: varchar({ length: 255 }).notNull(),
	courseId: int("course_id").notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const courseSeasons = mysqlTable("course_seasons", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	courseId: int("course_id").notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const sessions = mysqlTable("sessions", {
	id: varchar({ length: 36 }).notNull(),
	expiresAt: timestamp("expires_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	token: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	ipAddress: text("ip_address").default('NULL'),
	userAgent: text("user_agent").default('NULL'),
	userId: varchar("user_id", { length: 36 }).notNull(),
},
(table) => [
	unique("sessions_token_unique").on(table.token),
]);

export const students = mysqlTable("students", {
	id: int().autoincrement().notNull(),
	courseId: int("course_id").notNull(),
	studentId: varchar("student_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const teachersInfo = mysqlTable("teachers_info", {
	id: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	bio: varchar({ length: 255 }).notNull(),
	image: varchar({ length: 255 }).default('\'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg\'').notNull(),
	telegramId: varchar("telegram_id", { length: 255 }).default('NULL'),
	githubId: varchar("github_id", { length: 255 }).default('NULL'),
	instagramId: varchar("instagram_id", { length: 255 }).default('NULL'),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});

export const users = mysqlTable("users", {
	id: varchar({ length: 36 }).notNull(),
	name: text().notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: tinyint("email_verified").default(0).notNull(),
	role: mysqlEnum(['user','teacher']).default('\'user\''),
	image: text().default('NULL'),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
},
(table) => [
	unique("users_email_unique").on(table.email),
]);

export const verifications = mysqlTable("verifications", {
	id: varchar({ length: 36 }).notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	createdAt: timestamp("created_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
	updatedAt: timestamp("updated_at", { fsp: 3, mode: 'string' }).default('current_timestamp(3)').notNull(),
});
