import { courses as coursesTable, users as usersTable, students as studentsTable } from "@/db/schema";

type CourseType = typeof coursesTable.$inferSelect;
type StudentType = typeof studentsTable.$inferSelect;
type TeacherType = typeof usersTable.$inferSelect;

export interface CourseDataType extends CourseType {
	teacher: TeacherType,
	students: StudentType[]
}