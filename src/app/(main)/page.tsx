import Hero from "@/components/Hero";
import CourseList from "@/components/ui/course/CourseList";
import SectionHeader from "@/components/ui/SectionHeader";
import { getCourses } from "@/lib/actions";

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-20 w-full max-w-5xl">
      <Hero />
      <div className="flex flex-col">
        <SectionHeader title="آخرین دوره های ما" link={{ title: "همه دوره ها", href: "/courses" }} />
        {courses.length > 0 && (
          <div>
            <CourseList courses={courses} />
          </div>
        )}
      </div>
    </div>
  )
}
