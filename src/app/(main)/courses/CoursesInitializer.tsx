import CoursesWrapper from "@/components/CoursesWrapper";
import { db } from "@/db";
import { categories, teachersInfo } from "@/db/schema";
import { CourseFetchType, getCourses } from "@/lib/actions";
import { User } from "better-auth";
import React from "react";

type Props = {
	searchParams?: { [key: string]: string | undefined }
	byCategoryId?: string;
	byTeacher?: typeof teachersInfo.$inferSelect
}

export default async function CoursesInitializer({ searchParams: params, byCategoryId, byTeacher }: Props) {
	const sortTypes = ["default", "cheapest", "expensive", "popular"];
	const category: string[] = [];
	const onlyFree = Boolean(params?.onlyfree && params?.onlyfree === "on");
	const searchTerm = params?.s;

	if (byCategoryId) {
		category.push(byCategoryId);
	}

	if (Array.isArray(params?.category) && params?.category.length > 0) {
		category.push(...params?.category);
	} else if (typeof params?.category === "string" && params?.category.length > 0) {
		category.push(params?.category);
	}

	const courses = await getCourses({
		sortBy: sortTypes.some(sort => params?.sort === sort) ? params!.sort as CourseFetchType["sortBy"] : "default",
		category: category,
		onlyFree: onlyFree,
		searchTerm,
		byTeacherId: byTeacher?.id
	});

	const cats = await db.select().from(categories);

	return <CoursesWrapper byTeacher={byTeacher} courses={courses} cats={cats} />

}
