"use server"

import { db } from "@/db";
import { cart as cartTb, categories as categoriesTable, courses as coursesTable, students, users as usersTable } from "@/db/schema";
import { and, asc, desc, eq, inArray, like } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "./auth";
import { CourseDataType } from "./types/course.type";

export type CourseFetchType = {
	sortBy?: "default" | "cheapest" | "expensive" | "popular",
	category?: string[],
	onlyFree?: boolean,
	searchTerm?: string,
	byTeacherId?: string
}

export async function getCourses({ sortBy = "default", category = [], onlyFree = false, searchTerm, byTeacherId }: CourseFetchType = {}): Promise<CourseDataType[]> {
	let order: any = coursesTable.id;
	if (sortBy === "default") {
		order = desc(coursesTable.id);
	} else if (sortBy === "cheapest") {
		order = asc(coursesTable.price);
	} else if (sortBy === "expensive") {
		order = desc(coursesTable.price);
	} else if (sortBy === "popular") {
		order = desc(coursesTable.id);
	}

	const categories = await db.select().from(categoriesTable);

	const coursesData = (await db.select().from(coursesTable)
		.where(
			and(
				inArray(coursesTable.categoryId, category.length ? category.map(cat => Number(cat)) : categories.map(cat => cat.id)),
				onlyFree ? eq(coursesTable.price, 0) : undefined,
				searchTerm ? like(coursesTable.title, `%${searchTerm}%`) : undefined,
				byTeacherId ? eq(coursesTable.teacherId, byTeacherId) : undefined
			))
		.orderBy(order).innerJoin(usersTable, eq(coursesTable.teacherId, usersTable.id)))
		.map(course => {
			return {
				...course.courses,
				teacher: course.users,
			}
		});

	const courseStudents = await db.select().from(students).where(inArray(students.courseId, coursesData.map(course => course.id)));

	const courseDataWithStudents = coursesData.map(course => {
		return {
			...course,
			students: courseStudents
		}
	})

	return courseDataWithStudents;
}

type CartAddProps = {
	courseId: number;
	userId: string
}

export async function addCourseToCart({ courseId, userId }: CartAddProps) {
	try {
		const res = await db.insert(cartTb).values({ courseId, userId });
		console.log(res);
		return { err: null }
	} catch (err: any) {
		return { err: "مشکلی هنگام اضافه کردن به سبد پیش آمد." }
	}
}

export async function getUserCart(userId: string, { includeCourses = false }: { includeCourses?: boolean } = {}) {
	const cart = await db.select().from(cartTb).where(eq(cartTb.userId, userId));
	if (includeCourses) {
		const cartCourses = await db.select().from(coursesTable).where(inArray(coursesTable.id, cart.map(item => item.courseId)))
		return { cart, cartCourses };
	} else {
		return { cart };
	}
}

export async function removeCartItem(courseId: number) {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	if (!session?.user) return { err: "session is not set" };
	const userId = session.user.id;

	const [item] = await db.select().from(cartTb).where(
		and(
			eq(cartTb.userId, userId),
			eq(cartTb.courseId, courseId)
		)
	);

	if (!item) return { err: "دوره ای با این مشخصات در سبد پیدا نشد" }

	await db.delete(cartTb).where(eq(cartTb.courseId, item.courseId));
	return { err: null };
}

export async function getMe(userId: string) {
	const [me] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
	return me;
}

export async function addStudentToCourse(userId: string, courseIds: number[]) {
	let err = null;
	courseIds.forEach(async (courseId) => {
		try {
			const res = await db.insert(students).values({ courseId: courseId, studentId: userId })
			await db.delete(cartTb).where(
				and(
					eq(cartTb.courseId, courseId),
					eq(cartTb.userId, userId)
				)
			)
		} catch (err: any) {
			return { err: err.message }
		}
	})
	return { err };
}