import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CourseDataType } from "@/lib/types/course.type";
import { Star, User2, Users2 } from "lucide-react";
import Link from "next/link";

type Props = {
	course: CourseDataType
};

export default function CourseItem({ course }: Props) {
	const { id, title, cover, description, price, teacher, students } = course;

	return (
		<CardSpotlight className="rounded-lg overflow-hidden p-0">
			<Link href={`/courses/${id}`}>
				<img src={cover} alt={title} className="w-full rounded-lg relative" />
			</Link>
			<div className="flex flex-col gap-5 p-7 relative">
				<div className="text-white">
					<div className="truncate">
						<Link href={`/courses/${id}`} className="text-xl truncate">{title}</Link>
					</div>
					<p className="text-sm text-muted-foreground mt-3">{description.substring(0, 100)}...</p>
				</div>
				<div className="flex gap-4 items-center justify-between">	<Link href={`/courses/${id}`} className="text-sm inline-flex items-center gap-1 text-muted-foreground"><User2 size={17} /> {teacher.name}</Link>
					<p className="text-sm text-yellow-500 inline-flex items-center gap-1">
						5.0
						<Star fill="orange" size={17} />
					</p>
				</div>
				<div className="flex gap-4 items-center justify-between">
					<div className="text-sm text-muted-foreground inline-flex items-center gap-1">
						<Users2 size={17} />
						<span>{students.filter(st => st.courseId === id).length}</span>
					</div>
					<h3 className="text-sm">
						{price.toLocaleString()} تومان
					</h3>
				</div>
			</div>
		</CardSpotlight>
	)
}
