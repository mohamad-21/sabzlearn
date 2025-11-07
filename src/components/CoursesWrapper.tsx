"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CourseList from "@/components/ui/course/CourseList";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/ui/SectionHeader";
import { Switch } from "@/components/ui/switch";
import { categories, categories as catsTable, teachersInfo } from "@/db/schema";
import { CourseDataType } from "@/lib/types/course.type";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { User } from "better-auth";
import { ArrowUpDown, ChevronDown, FolderOpen, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Props = {
	courses: CourseDataType[];
	cats: (typeof catsTable.$inferSelect)[];
	byTeacher?: typeof teachersInfo.$inferSelect;
}

export default function CoursesWrapper({ courses, cats, byTeacher: teacher }: Props) {
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState("");
	const [pageTitle, setPageTitle] = useState("دوره های آموزشی");
	const pathname = usePathname();
	const router = useRouter();
	const byTeacher = Boolean(teacher);

	const onCheckCats = (newCat: string) => {
		const params = new URLSearchParams(searchParams);

		if (params.has("category", newCat)) {
			params.delete("category", newCat);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
			return;
		};

		params.append("category", newCat)
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
		if (!searchTerm && params.has("s")) {
			params.delete("s");
		} else {
			params.set("s", searchTerm);
		}

		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	const onSort = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("sort", value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });

	}

	useEffect(() => {
		if (searchTerm) {
			setPageTitle(`جستجو: \"${searchTerm}\"`);
		}
	}, [searchTerm]);


	useEffect(() => {
		const selectedCat = searchParams.get("category");

		if (selectedCat) {
			setPageTitle("دوره ها بر اساس دسته بندی ها")
		}
		else {
			setPageTitle("دوره های آموزشی")
		}
	}, [searchParams.get("category")]);

	return (
		<>
			{!byTeacher && (
				<SectionHeader title={pageTitle} subtitle={`${courses.length} دوره آموزشی`} />
			)}
			<div className={`flex lg:flex-row w-full lg:max-w-full max-w-3xl flex-col lg:gap-4 ${byTeacher ? "gap-10" : "gap-20"}`}>
				{byTeacher ? (
					<div className="flex flex-col items-center text-center gap-4 flex-1 lg:sticky top-20 bottom-0 right-0 min-h-[350px] max-h-max py-6 px-4 rounded-lg bg-card">
						<img src={teacher?.image!} width={100} className="rounded-full" alt={teacher?.name} />
						<h2 className="text-2xl">{teacher?.name}</h2>
						<p className="text-muted-foreground max-w-md">
							{teacher?.bio}
						</p>
						<div className="mt-3 flex items-center justify-center gap-2">
							<Link href={`${teacher?.instagramId ? `https://instagram.com/${teacher?.instagramId}` : '#'}`} target={`${teacher?.instagramId ? "_blank" : "_self"}`} className="p-3 rounded-full border-2 border-border hover:bg-border">
								<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
							</Link>
							<Link href={`${teacher?.telegramId ? `https://t.me/${teacher?.telegramId}` : '#'}`} target={`${teacher?.telegramId ? "_blank" : "_self"}`} className="p-3 rounded-full border-2 border-border hover:bg-border">
								<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
							</Link>
							<Link href={`${teacher?.githubId ? `https://github.com/${teacher?.githubId}` : '#'}`} target={`${teacher?.githubId ? "_blank" : "_self"}`} className="p-3 rounded-full border-2 border-border hover:bg-border">
								<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
							</Link>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4 flex-1 lg:sticky top-20 bottom-0 right-0 lg:max-h-[850px] min-w-[250px]">
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
									{cats.map(cat => (
										<div key={cat.id} className="flex items-center gap-3 text-sm">
											<Checkbox checked={searchParams.has("category", cat.id.toString())} onClick={() => onCheckCats(cat.id.toString())} id={cat.name} />
											<label className="w-full cursor-pointer capitalize" htmlFor={cat.name}>{cat.name.split("_").join(" ")}</label>
										</div>
									))}
									{/* <div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "backend")} onClick={() => onCheckCats("backend")} id="backend" />
									<label className="w-full cursor-pointer" htmlFor="backend">بک اند</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "skill_up")} onClick={() => onCheckCats("skill_up")} id="skill_up" />
									<label className="w-full cursor-pointer" htmlFor="skill_up">ارتقای مهارت</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "cyber_security")} onClick={() => onCheckCats("cyber_security")} id="cyber_security" />
									<label className="w-full cursor-pointer" htmlFor="cyber_security">امنیت</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "python")} onClick={() => onCheckCats("python")} id="python" />
									<label className="w-full cursor-pointer" htmlFor="python">پایتون</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "soft_skills")} onClick={() => onCheckCats("soft_skills")} id="soft_skills" />
									<label className="w-full cursor-pointer" htmlFor="soft_skills">مهارت های نرم</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "php")} onClick={() => onCheckCats("php")} id="php" />
									<label className="w-full" htmlFor="php">پی اچ پی</label>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<Checkbox checked={searchParams.has("category", "nodejs")} onClick={() => onCheckCats("nodejs")} id="nodejs" />
									<label className="w-full" htmlFor="nodejs">نود جی اس</label>
								</div> */}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				)}

				<div className="flex flex-col gap-4 flex-3">
					<div className="flex items-center md:flex-row flex-col gap-3 py-4 px-4 bg-card rounded-md">
						<h3 className="inline-flex items-center gap-3">
							<ArrowUpDown size={28} />
							مرتب سازی بر اساس
						</h3>

						<div className="flex flex-wrap items-center gap-2">
							<Button variant={(searchParams.has("sort", "default") || !searchParams.has("sort")) ? "default" : "outline"} onClick={() => onSort("default")}>همه دوره ها</Button>
							<Button variant={searchParams.has("sort", "cheapest") ? "default" : "outline"} onClick={() => onSort("cheapest")}>ارزان ترین</Button>
							<Button variant={searchParams.has("sort", "expensive") ? "default" : "outline"} onClick={() => onSort("expensive")}>گران ترین</Button>
							<Button variant={searchParams.has("sort", "popular") ? "default" : "outline"} onClick={() => onSort("popular")}>پرمخاطب</Button>
						</div>
					</div>
					{courses.length > 0 ? (
						<CourseList courses={courses} maxCols={2} />
					) : (
						<h3 className="md:text-2xl text-lg my-3">دوره مورد نظر شما پیدا نشد😦😭😭</h3>
					)}
				</div>
			</div>
		</>
	)
}
