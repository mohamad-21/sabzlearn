import { Spinner } from "@/components/ui/spinner";
import { db } from "@/db";
import { teachersInfo as teachersInfoTb, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import CoursesInitializer from "../../courses/CoursesInitializer";

type Props = {
	params: Promise<{ teacherId: string }>;
	searchParams?: Promise<{ [key: string]: string | undefined }>
}

export default async function Teacher({ params, searchParams }: Props) {
	const { teacherId } = await params;
	const searchParam = await searchParams;

	const [teacher] = await db.select().from(teachersInfoTb).where(eq(teachersInfoTb.id, teacherId));

	if (!teacher) return notFound();

	return (
		<div className="flex flex-col items-center py-20 w-full max-w-5xl">
			<Suspense fallback={<Spinner />}>
				<CoursesInitializer byTeacher={teacher} searchParams={searchParam} />
			</Suspense>
		</div>
	)
}
