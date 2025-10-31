
import Hero from "@/components/Hero";
import Link from "next/link";
import React from "react";
import { ArrowUpLeft } from "lucide-react";
import CourseList from "@/components/ui/course/CourseList";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 w-full max-w-5xl">
      <Hero />
      <div className="flex flex-col">
        <SectionHeader title="آخرین دوره های ما" link={{ title: "همه دوره ها", href: "/courses" }} />
        <div>
          <CourseList courses={[
            {
              title: "آموزش پروژه محور NestJS از صفر!",
              desc: "NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر...",
              img: "https://sabzlearn.ir/wp-content/uploads/2025/07/2-768x432.webp"
            },
            {
              title: "آموزش پروژه محور NestJS از صفر!",
              desc: "NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر...",
              img: "https://sabzlearn.ir/wp-content/uploads/2025/07/2-768x432.webp"
            },
            {
              title: "آموزش پروژه محور NestJS از صفر!",
              desc: "NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر...",
              img: "https://sabzlearn.ir/wp-content/uploads/2025/07/2-768x432.webp"
            },
            {
              title: "آموزش پروژه محور NestJS از صفر!",
              desc: "NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر...",
              img: "https://sabzlearn.ir/wp-content/uploads/2025/07/2-768x432.webp"
            },
            {
              title: "آموزش پروژه محور NestJS از صفر!",
              desc: "NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر...",
              img: "https://sabzlearn.ir/wp-content/uploads/2025/07/2-768x432.webp"
            },
          ]} />
        </div>
      </div>
    </div>
  )
}
