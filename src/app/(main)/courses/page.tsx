import CoursesWrapper from "@/components/CoursesWrapper";
import { Spinner } from "@/components/ui/spinner";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { CourseFetchType, getCourses } from "@/lib/actions";
import { Suspense } from "react";
// import CoursesInitializer from "./CoursesInitializer";

type Props = {
	searchParams?: Promise<{ [key: string]: string | undefined }>
}

export default async function Courses({ searchParams }: Props) {
	return (
		<div className="flex flex-col items-center py-20 w-full max-w-5xl">
			<Suspense fallback={<Spinner />}>
				<CoursesInitializer searchParams={searchParams} />
			</Suspense>
		</div>
	)
}

async function CoursesInitializer({ searchParams }: Props) {
	const params = await searchParams;
	const sortTypes = ["default", "cheapest", "expensive", "popular"];
	const category: string[] = [];
	const onlyFree = Boolean(params?.onlyfree && params?.onlyfree === "on");
	const searchTerm = params?.s;

	if (Array.isArray(params?.category) && params?.category.length > 0) {
		category.push(...params?.category);
	} else if (typeof params?.category === "string" && params?.category.length > 0) {
		category.push(params?.category);
	}

	const courses = await getCourses({
		sortBy: sortTypes.some(sort => params?.sort === sort) ? params!.sort as CourseFetchType["sortBy"] : "default",
		category: category,
		onlyFree: onlyFree,
		searchTerm
	});

	const cats = await db.select().from(categories);

	return <CoursesWrapper courses={courses} cats={cats} />

}