"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CourseList from "@/components/ui/course/CourseList";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/ui/SectionHeader";
import { Switch } from "@/components/ui/switch";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { ArrowUpDown, ChevronDown, FolderOpen, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CoursesWrapper() {
	const searchParams = useSearchParams();
	const [selectedCats, setSelectedCats] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const pathname = usePathname();
	const router = useRouter();

	const onCheckCats = (newCat: string) => {
		const params = new URLSearchParams(searchParams);

		if (selectedCats.some(cat => cat === newCat)) {
			setSelectedCats(selectedCats.filter(cat => cat !== newCat))
			params.delete("category", newCat);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
			return;
		};

		params.append("category", newCat)
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });

		setSelectedCats(prev => [...prev, newCat]);
	}

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams);
		if (params.has(key)) {
			params.delete(key);
		} else {
			params.set(key, value);
		}
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	const onSearch = (e: FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams);
		if (!searchTerm) return;

		params.set("s", searchTerm);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	const onSort = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("sort", value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });

	}

	const pageTitle = searchTerm.trim() ? `جستجو: \"${searchTerm}\"` : "دوره ها"

	return (
		<>
			<SectionHeader title={pageTitle} subtitle="۷۶ دوره آموزشی" />
			<div className="flex lg:flex-row flex-col lg:gap-4 gap-20">
				<div className="flex flex-col gap-4 flex-1">
					<form onSubmit={onSearch} className="relative">
						<Input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="p-7 pl-12 w-full bg-background" placeholder="جست و جو در بین دوره ها..." />
						<div className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
							<Search />
						</div>
					</form>

					<label htmlFor="free-courses" className="flex items-center gap-3 py-4 px-6 bg-card rounded-sm justify-between cursor-pointer">
						<h2>فقط دوره های رایگان</h2>
						<Switch checked={searchParams.has("onlyfree", "on")} onCheckedChange={() => updateFilter("onlyfree", "on")} dir="ltr" id="free-courses" />
					</label>

					<label htmlFor="free-courses" className="flex items-center gap-3 py-4 px-6 bg-card rounded-sm justify-between cursor-pointer">
						<h2>در حال پیش فروش</h2>
						<Switch checked={searchParams.has("presell", "on")} onCheckedChange={() => updateFilter("presell", "on")} dir="ltr" id="free-courses" />
					</label>

					<Accordion type="single" collapsible defaultValue="cat">
						<AccordionItem value="cat" className="bg-card py-4 px-6 rounded-sm">
							<AccordionTrigger className="flex items-center gap-3 justify-between w-full">
								<span className="inline-flex gap-3 items-center">
									<FolderOpen />
									دسته بندی دوره ها
								</span>
								<ChevronDown className="md:block hidden" />
							</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-6 pt-8 pb-6">
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "front-end")} onClick={() => onCheckCats("front-end")} id="front-end" />
									<label className="w-full cursor-pointer" htmlFor="front-end">فرانت اند</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "back-end")} onClick={() => onCheckCats("back-end")} id="back-end" />
									<label className="w-full cursor-pointer" htmlFor="back-end">بک اند</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "skill-up")} onClick={() => onCheckCats("skill-up")} id="skill-up" />
									<label className="w-full cursor-pointer" htmlFor="skill-up">ارتقای مهارت</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "cyber-security")} onClick={() => onCheckCats("cyber-security")} id="cyber-security" />
									<label className="w-full cursor-pointer" htmlFor="cyber-security">امنیت</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "python")} onClick={() => onCheckCats("python")} id="python" />
									<label className="w-full cursor-pointer" htmlFor="python">پایتون</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "soft-skills")} onClick={() => onCheckCats("soft-skills")} id="soft-skills" />
									<label className="w-full cursor-pointer" htmlFor="soft-skills">مهارت های نرم</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "php")} onClick={() => onCheckCats("php")} id="php" />
									<label className="w-full" htmlFor="php">پی اچ پی</label>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox checked={searchParams.has("category", "nodejs")} onClick={() => onCheckCats("nodejs")} id="nodejs" />
									<label className="w-full" htmlFor="nodejs">نود جی اس</label>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

				</div>

				<div className="flex flex-col gap-4 flex-3">
					<div className="flex items-center gap-3 py-4 px-4 bg-card rounded-md">
						<h3 className="inline-flex items-center gap-3">
							<ArrowUpDown size={28} />
							مرتب سازی بر اساس
						</h3>

						<div className="flex items-center gap-2">
							<Button variant={(searchParams.has("sort", "default") || !searchParams.has("sort")) ? "default" : "outline"} onClick={() => onSort("default")}>همه دوره ها</Button>
							<Button variant={searchParams.has("sort", "cheapest") ? "default" : "outline"} onClick={() => onSort("cheapest")}>ارزان ترین</Button>
							<Button variant={searchParams.has("sort", "expensive") ? "default" : "outline"} onClick={() => onSort("expensive")}>گران ترین</Button>
							<Button variant={searchParams.has("sort", "popular") ? "default" : "outline"} onClick={() => onSort("popular")}>پرمخاطب</Button>
						</div>
					</div>

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
					]} maxCols={2} />
				</div>

			</div>
		</>
	)
}
