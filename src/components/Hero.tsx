import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import StatsCard from "./ui/StatsCard";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { db } from "@/db";
import { courses, students } from "@/db/schema";
import SearchForCourses from "./SearchForCourses";

export default async function Hero() {
	const [totalCourses, totalStudents] = await Promise.all([
		db.$count(courses),
		db.$count(students)
	]);

	return (
		<div className="flex flex-col items-center justify-center gap-12 min-h-[110dvh] py-10">
			<div className="flex items-center flex-col gap-6 z-[1]">
				<h1 className="md:text-4xl text-3xl font-bold">سبزلرن، اولین گام برنامه نویس شدن</h1>
				<p>با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن</p>
			</div>
			<SearchForCourses />
			<div className="flex items-center gap-4 justify-around w-full max-w-lg z-[1]">
				<StatsCard image="/clock-min.webp" text="ساعت آموزش" number={1733} />
				<StatsCard image="/book-min.webp" text="دوره" number={totalCourses} />
				<StatsCard image="/conversation-min.webp" text="دانشجو" number={totalStudents} />
			</div>
			<div className="z-0">
				<BackgroundRippleEffect rows={12} />
			</div>
		</div>
	)
}
