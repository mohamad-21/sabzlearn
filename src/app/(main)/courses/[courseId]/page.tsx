import CourseDetails from "@/components/ui/course/CourseDetails";
import { db } from "@/db";
import { categories as catsTb, courseLessons, courseSeasons as courseSeasonsTb, courses as coursesTb, students, students as studentsTb, users as usersTb } from "@/db/schema";
import { getMe, getUserCart } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

type Props = {
	params: Promise<{ courseId: string }>
}

export default async function Course({ params }: Props) {
	const { courseId } = await params;
	const [course] = await db.select().from(coursesTb).where(eq(coursesTb.id, Number(courseId)));
	const [teacher] = await db.select().from(usersTb).where(eq(usersTb.id, course.teacherId));
	const courseSeasons = await db.select().from(courseSeasonsTb).where(eq(courseSeasonsTb.courseId, course.id))
	const students = await db.select().from(studentsTb).where(eq(studentsTb.courseId, course.id));
	const categories = await db.select().from(catsTb);
	const session = await auth.api.getSession({
		headers: await headers()
	});

	let user: any = null;

	if (session?.user) {
		const userData = await getMe(session?.user?.id);
		const { cart: cartData } = await getUserCart(userData.id);
		user = { ...userData, cart: cartData }
	}

	return (
		<CourseDetails course={course} teacher={teacher} students={students} courseSeasons={courseSeasons} cats={categories} user={user} />
	)
}
