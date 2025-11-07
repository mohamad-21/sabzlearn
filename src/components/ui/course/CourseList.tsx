"use client";

import { courses as coursesTable, users } from "@/db/schema";
import CourseItem from "./CourseItem";
import { CourseDataType } from "@/lib/types/course.type";

type Props = {
	courses: CourseDataType[],
	maxCols?: 3 | 2
}

export default function CourseList({ courses, maxCols = 3 }: Props) {
	return (
		<ul className={`grid ${maxCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} sm:grid-cols-2 grid-cols-1 gap-4`}>
			{courses.map((course) => (
				<li key={course.id}>
					<CourseItem course={course} />
				</li>
			))}
		</ul>
	)
}
