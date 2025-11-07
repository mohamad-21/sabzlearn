"use client";

import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import { cart, categories, courses, courseSeasons as courseSeasonsTb, students as studentsTb, users } from "@/db/schema";
import { addCourseToCart } from "@/lib/actions";
import { User } from "better-auth";
import { ChevronLeft, GraduationCap, Handbag, Play, Star, Users2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../item";
import { Spinner } from "../spinner";

type Props = {
	course: typeof courses.$inferSelect;
	teacher: typeof users.$inferSelect;
	students: typeof studentsTb.$inferSelect[];
	courseSeasons: typeof courseSeasonsTb.$inferSelect[];
	cats: typeof categories.$inferSelect[];
	user: User & { cart: typeof cart.$inferSelect[] } | null
}

export default function CourseDetails({ course, teacher, students, courseSeasons, cats, user }: Props) {
	const [showMore, setShowMore] = useState(false);
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	const onAddToCart = async () => {
		if (!user?.email) {
			toast.error("برای استفاده از سبد باید وارد حساب خود بشید");
			return;
		};
		if (user.cart.some(item => item.courseId === course.id)) {
			toast.error("این دوره از قبل در سبد خرید شما هست");
			return;
		}
		startTransition(async () => {
			const { err } = await addCourseToCart({ courseId: course.id, userId: user.id })
			if (!err) {
				router.refresh();
				toast.success(`دوره ${course.title} به سبد خرید شما اضافه شد`);
			} else {
				toast.error(err);
			}
		})
	}

	return (
		<div className="flex flex-col gap-14 py-20 w-full max-w-5xl">
			<Breadcrumb dir="rtl">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">خانه</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronLeft />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<Link href="/courses">دوره ها</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronLeft />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<Link href={`/courses?category=${course.categoryId}`} className="capitalize">{cats.find(cat => cat.id === course.categoryId)!.name.split("_").join(" ")}</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronLeft />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>{course.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex lg:items-center gap-6 lg:flex-row flex-col-reverse">
				<div className="flex flex-col gap-6">
					<SectionHeader
						title={course.title}
						subtitle={course.description}
						direction="col"
					/>
					<div className="flex items-center flex-wrap gap-6">
						{students.some(st => (st.courseId === course.id) && (st.studentId === user?.id)) ? (
							<h3 className="text-xl text-primary">
								دانشجوی این دوره هستید
							</h3>
						) :
							<>
								{user?.cart.some(item => item.courseId === course.id) ? (
									<Button variant="secondary" size="lg" className="text-base" disabled={pending} onClick={onAddToCart}>
										{pending && <Spinner />}
										این دوره در سبد خرید شماست
									</Button>
								) : (
									<Button size="lg" className="text-base" disabled={pending} onClick={onAddToCart}>
										{pending ? <Spinner /> : <Handbag className="size-5" />}
										افزودن به سبد خرید
									</Button>
								)}
							</>
						}
						{!students.some(st => (st.courseId === course.id) && (st.studentId === user?.id)) && (
							<div>
								<h3 className="text-xl"><span className="text-2xl">{course.price.toLocaleString()}</span> تومان</h3>
							</div>
						)}
					</div>
				</div>
				<div className="lg:max-w-md max-w-2xl border-2 border-accent rounded-2xl overflow-hidden">
					<video poster={course.cover} className="w-full" controls></video>
				</div>
			</div>
			<div className="flex lg:flex-row flex-col items-start gap-4">
				<div className="flex flex-col gap-6 flex-2 lg:max-w-[650px]">
					<div className="grid md:grid-cols-3 grid-cols-2 gap-3">
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>وضعیت دوره</ItemTitle>
								<ItemDescription>{course.status}</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>مدت زمان دوره</ItemTitle>
								<ItemDescription>{course.duration}</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>آخرین بروزرسانی</ItemTitle>
								<ItemDescription>{Intl.DateTimeFormat("fa-ir", {
									dateStyle: "medium",
								}).format(course.updatedAt)}</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>روش پشتیبانی</ItemTitle>
								<ItemDescription>{course.supportMode}</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>پیش نیاز</ItemTitle>
								<ItemDescription>{course.requirement}</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>نوع مشاهده</ItemTitle>
								<ItemDescription>{course.tutorialMode}</ItemDescription>
							</ItemContent>
						</Item>
					</div>
					<div className="flex flex-col gap-6 px-6 py-10 rounded-xl bg-card relative max-w-full overflow-hidden">
						<h3 className="text-3xl">توضیحات</h3>
						<p className={`whitespace-pre-wrap w-full text-wrap text-muted-foreground grid gap-6 leading-9 ${showMore ? "max-h-max" : "max-h-[300px]"} overflow-hidden`} dangerouslySetInnerHTML={{ __html: course.content }} />
						<div className={`${showMore ? "static pt-12" : "absolute bg-linear-to-b from-card/30 dark:via-card to-background h-[200px] bottom-0 left-0 right-0 pb-12"} flex items-end justify-center `}>
							<Button variant="outline" size="lg" className="text-base" onClick={() => setShowMore(!showMore)}>مشاهده {showMore ? "کمتر" : "بیشتر"}</Button>
						</div>
					</div>
					<div className="flex flex-col gap-6 bg-card py-10 rounded-xl px-6">
						<h3 className="text-2xl flex items-center gap-3">
							<GraduationCap size={35} />
							سر فصل ها
						</h3>
						{courseSeasons.length > 0 ? (
							<Accordion type="single" className="space-y-3" collapsible>
								{courseSeasons.map(season => (
									<AccordionItem key={season.id} value={season.id.toString()} className="bg-secondary rounded-lg">
										<AccordionTrigger className="flex items-center justify-between gap-4 !no-underline px-4">
											<h3 className="text-lg">{season.title}</h3>
											<p className="text-muted-foreground mr-auto" dir="ltr">
												2 lessons - 30 min
											</p>
										</AccordionTrigger>
										<AccordionContent className="w-full flex flex-col">
											<Button variant="secondary" className="hover:bg-card flex items-center justify-between py-8 px-6 rounded-none">
												<h4 className="text-base">معرفی دوره +‌ پاسخ به سوالات متداول</h4>
												<div className="text-base text-muted-foreground inline-flex items-center gap-2">
													<Play />
													<span>۰۸:۲۶</span>
												</div>
											</Button>
											<Button variant="secondary" className="hover:bg-card flex items-center justify-between py-8 px-6 rounded-none">
												<h4 className="text-base">معرفی دوره +‌ پاسخ به سوالات متداول</h4>
												<div className="text-base text-muted-foreground inline-flex items-center gap-2">
													<Play />
													<span>۰۸:۲۶</span>
												</div>
											</Button>
											<Button variant="secondary" className="hover:bg-card flex items-center justify-between py-8 px-6 rounded-none">
												<h4 className="text-base">معرفی دوره +‌ پاسخ به سوالات متداول</h4>
												<div className="text-base text-muted-foreground inline-flex items-center gap-2">
													<Play />
													<span>۰۸:۲۶</span>
												</div>
											</Button>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						) : (
							<p className="text-muted-foreground">هنوز ویدیویی در این دوره ظبط نشده</p>
						)}
					</div>
				</div>
				<div className="flex flex-col flex-1 gap-4 w-full max-w-xl">
					<div className="px-4 py-6 rounded-xl flex flex-col gap-4 bg-card">
						<div className="grid grid-cols-2 gap-3">
							<Item variant="muted" className="bg-accent">
								<ItemActions><Users2 size={30} /></ItemActions>
								<ItemContent>
									<ItemTitle className="text-xl">{students.length}</ItemTitle>
									<ItemDescription>دانشجو</ItemDescription>
								</ItemContent>
							</Item>
							<Item variant="muted" className="bg-accent">
								<ItemActions><Star color="orange" fill="orange" size={30} /></ItemActions>
								<ItemContent>
									<ItemTitle className="text-xl">5.0</ItemTitle>
									<ItemDescription>رضایت</ItemDescription>
								</ItemContent>
							</Item>
						</div>
						<div className="flex flex-col justify-between gap-3 pt-3">
							<div className="flex items-center justify-between">
								<h3>درصد تکمیل دوره</h3>
								<h3>{course.completePercent}%</h3>
							</div>
							<div className="h-2 w-full rounded-full bg-primary"></div>
						</div>
					</div>
					<div className="flex flex-col items-center gap-3 py-4 px-6 bg-card rounded-xl">
						<img src={teacher.image!} className="rounded-full object-cover" width={100} alt="teacher" />
						<div className="flex flex-col gap-4 items-center">
							<h3 className="text-xl">{teacher.name}</h3>
							<Link href={`/teachers/${teacher.id}`}>
								<Button size="lg" variant="outline">مشاهده پروفایل</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
