"use client";

import CourseItem from "./CourseItem";

type Props = {
	courses: {
		title: string
		img: string
		desc: string
	}[],
	maxCols?: 3 | 2
}

export default function CourseList({ courses, maxCols = 3 }: Props) {
	return (
		<ul className={`grid ${maxCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} sm:grid-cols-2 grid-cols-1 gap-4`}>
			{courses.map((course, idx) => (
				<li key={idx}>
					<CourseItem title={course.title} img={course.img} desc={course.desc} />
				</li>
			))}
		</ul>
	)
}
