"use client";

import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpLeft, ChevronLeft, GraduationCap, Handbag, Play, Star, Users2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../item";

export default function CourseDetails() {
	const [showMore, setShowMore] = useState(false);

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
						<Link href="/category/front-end">فرانت اند</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronLeft />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>آموزش Next.js به صورت پروژه محور</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex lg:items-center gap-6 lg:flex-row flex-col-reverse">
				<div className="flex flex-col gap-6">
					<SectionHeader
						title="آموزش Next.js به صورت پروژه محور"
						subtitle="نکست یه فریمورک مبتنی بر ری‌اکت هست که امروزه تو بازار کار یکی از مهم‌ترین تکنولوژی‌ها برای توسعه دهنده های ری‌اکت به حساب میاد. نکست رو میشه مکمل ری‌اکت دونست. یعنی هر چی که ری‌اکت داره"
						direction="col"
					/>
					<div className="flex items-center gap-6">
						<Button size="lg" className="text-base">
							<Handbag className="size-5" />
							افزودن به سبد خرید
						</Button>
						<div>
							<h3 className="text-xl"><span className="text-2xl">230,000</span> تومان</h3>
						</div>
					</div>
				</div>
				<div className="lg:max-w-md border-2 border-accent rounded-2xl overflow-hidden">
					<video poster="https://sabzlearn.ir/wp-content/uploads/2025/07/29-1.webp" src="https://tech.sabzlearn.ir/uploads/ce01010101it/next/Next001-intro.mp4?h=Gy_p9nV0Cj8qLfQu1xFxTw&t=1761985445" controls></video>
				</div>
			</div>
			<div className="flex lg:flex-row flex-col items-start gap-4">
				<div className="flex flex-col gap-6 flex-1 lg:max-w-[650px]">
					<div className="grid md:grid-cols-3 grid-cols-2 gap-3">
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>وضعیت دوره</ItemTitle>
								<ItemDescription>تکمیل شده</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>مدت زمان دوره</ItemTitle>
								<ItemDescription>۶۲ ساعت</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>آخرین بروزرسانی</ItemTitle>
								<ItemDescription>۱۴۰۳/۰۷/۱۹</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>روش پشتیبانی</ItemTitle>
								<ItemDescription>آنلاین</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>پیش نیاز</ItemTitle>
								<ItemDescription>React JS</ItemDescription>
							</ItemContent>
						</Item>
						<Item variant="muted">
							<ItemContent>
								<ItemTitle>نوع مشاهده</ItemTitle>
								<ItemDescription>به صورت آنلاین</ItemDescription>
							</ItemContent>
						</Item>
					</div>
					<div className="flex flex-col gap-6 px-6 py-10 rounded-xl bg-card relative">
						<h3 className="text-3xl">توضیحات</h3>
						<p className={`whitespace-pre-wrap text-wrap text-muted-foreground grid gap-6 leading-9 ${showMore ? "max-h-max" : "max-h-[300px]"} overflow-hidden`}>
							NEXT.Js یا NEXT طی چندسال اخیر برای تکمیل و تقویت تکنولوژی React وارد میدون شد و سعی کرد تمام نواقص یا محدودیت های اون رو پوشش بده تا هیچ شک و شبهه ای در قدرت ری اکت برای طراحی صفحات وب باقی نمونه. به عبارتی اومده تا با ویژگی فول استک بودن، React رو فراتر از یک تکنولوژی فرانت اند جا بندازه و از طریق ترکیب اون با Node Js در بک اند، به شما کمک کنه یک پروژه کامل و صفر تا صد وب رو به بهترین شکل طراحی و پیاده سازی کنید.
							<img src="https://sabzlearn.ir/wp-content/uploads/2024/01/next-1536x864.webp" alt="image" className="rounded-2xl" />
							اگر در برنامه نویسی دنبال کاهش کدهای برنامه، سرعت اجرای فوق العاده وب سایت، فول استک بودن تکنولوژی و همینطور پشتیبانی اون هستید، NEXT یکی از بهترین گزینه های موجود روی میز شما خواهد بود چون علاوه بر داشتن تمام مزایای ری اکت، اکثر ایراداتی که توسعه دهنده های تکنولوژی های رقیب به اون وارد میکردن رو پوشش داده و حتی فراتر از اونها عمل کرده.

							در ادامه به طور خلاصه ویژگی های اصلی که باعث افزایش قدرت و محبوبیت NEXT در بین توسعه دهنده ها شده رو باهم بررسی خواهیم کرد. با ما همراه باشید…

							رندرینگ سمت سرور (SSR)
							در واقع NEXT امکان بارگذاری صفحات React  در سمت سرور رو به شما میده که این کار باعث میشه بتونید صفحات رو ابتدا با اطلاعات و داده های سرور پر کرده و بعد از داینامیک شدن، اون رو به عنوان یک صفحه HTML  آماده به کاربران نمایش بدید.

							پشتیبانی از CSR (Client-Side Rendering)
							NEXT  علاوه بر اینکه قابلیت رندرینگ سمت سرور رو در اختیار شما میذاره، در عین حال امکان رندرینگ و بارگذاری محتوا سمت کلاینت رو هم برای شما فراهم میکنه. پس با استفاده از این قابلیت میتونید بدون بارگذاری یا رفرش مجدد صفحات، به صورت لحظه ای تغییرات کاربری رو اعمال کرده و نمایش بدید.

							Routing ساده و اتوماتیک
							در NEXT یک سیستم Routing  ساده و قابل فهم وجود داره که صفحات جدید رو با استفاده از فایل های جدیدی که میسازید و پوشه بندی که خودش انجام میده، به صورت اتوماتیک مسیریابی میکنه که یکی از ویژگی های مهم این تکنولوژی محسوب میشه. در حالی که این کار در React باید به صورت دستی انجام میشد.

							پشتیبانی از Static Site Generation (SSG)
							این قابلیت فوق العاده به شما کمک میکنه تا برای کاهش بار سرور و حجم درخواست های ارسالی به سمت اون، بخشی از قسمت ها و صفحات رو به صورت استاتیک طراحی کنید تا برای هربار لود شدن نیازی به ارسال درخواست وجود نداشته باشه.

							این مزایا در کنار دهها ویژگی دیگه باعث بهبود تجربه کاربری و سرعت سایت میشه که نتیجه اون تسهیل و تقویت فرآیند سئو خواهد بود. اساسا یکی از مهمترین دلایل معرفی NEXT پوشش نقاط ضعف React در مباحث سئو بود که دیگه میشه گفت کاملا برطرف شده و از لحاظ گوگل پسند بودن جزو بهترینهاست.

							حالا که با ویژگی های فنی NEXT آشنا شدید، در ادامه به تمام سوالات و دغدغه هایی که ممکنه قبل از شروع دوره در ذهن شما باشه جواب دادیم تا با خیال راحت و دید باز مسیر آموزشتون رو شروع کنید.

							تو این دوره قراره چی یاد بگیریم؟
							به طور خلاصه در این دوره شما هر آنچه برای مسلط شدن به NEXTJS نیاز داشته باشید به شما آموزش داده میشه. یعنی ابتدا یه سری نکات کلی در مورد سئو در فرانت اند به شما آموزش داده میشه که توصیه میکنیم حتما این قسمت‌های اول رو که رایگان هم هستن ببینید تا علاوه بر اصلاح و تکمیل تسلط شما به این موضوع، آمادگی خوبی برای مطالب بعدی پیدا کنید.

							در مرحله بعد کانسپت های اصلی و اساسی NEXTJS  رو به صورت کامل و عمیق آموزش می بینید به صورتی که بتونید در پروژه های واقعی و کاربردی ازشون استفاده کنید. در واقع در این مرحله هست که به صورت عمیق با NEXTJS  و قدرت اون آشنا خواهید شد.

							بعد از اینکه تونستید با کانسپت های اصلی NEXTJS  آشنا بشید، وارد مرحله جذاب پروژه های عملی میشید و اونجا با چهار تا مینی پروژه مطالب رو مرور خواهید کرد. بعد از اون یک پروژه خیلی خوب توسعه میدید تا مطمئن بشیم به تسلط کامل رسیدید.

							این دوره برای چه کسانی مناسب هست؟
							دوره جامع NEXT برای دو دسته از دانشجوها خیلی مفید و کاربردی هست.

							دسته اول کسانی که در حال حاضر در سطح متوسط و پیشرفته با React کار میکنن

							دسته دوم کسانی که قبلا دوره NEXT در جاهای دیگه رو گذروندن اما به هر دلیل خوب مسلط نشدن یا نتونستن از مطالب اون دوره استفاده کنن

							اگر جزو یکی از این دوتا دسته هستید، این دوره جامع برای شما تولید شده و اونقدر به دانش و تجربیات شما اضافه می‌کنه که هر ایده و طرحی تو ذهنتون بیاد رو به راحتی بتونید پیاده سازی کنید یا حتی بخش هایی از پروژه های دیگران رو که از نظر شما جذاب و خلاقانه هستن، در پروژه خودتون بسازید.</p>
						<div className={`${showMore ? "static pt-12" : "absolute bg-linear-to-b from-card/30 dark:via-card to-background h-[200px] bottom-0 left-0 right-0 pb-12"} flex items-end justify-center `}>
							<Button variant="outline" size="lg" className="text-base" onClick={() => setShowMore(!showMore)}>مشاهده {showMore ? "کمتر" : "بیشتر"}</Button>
						</div>
					</div>
					<div className="flex flex-col gap-6 bg-card py-10 rounded-xl px-6">
						<h3 className="text-2xl flex items-center gap-3">
							<GraduationCap size={35} />
							سر فصل ها
						</h3>
						<Accordion type="single" className="space-y-3" collapsible>
							<AccordionItem value="1" className="bg-secondary rounded-lg">
								<AccordionTrigger className="flex items-center justify-between gap-4 !no-underline px-4">
									<h3 className="text-lg">معرفی دوره</h3>
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
							<AccordionItem value="2" className="bg-secondary rounded-lg">
								<AccordionTrigger className="flex items-center justify-between gap-4 !no-underline px-4">
									<h3 className="text-lg">سئو و فرانت اند</h3>
									<p className="text-muted-foreground mr-auto" dir="ltr">
										4 lessons - 140 min
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
						</Accordion>
					</div>
				</div>
				<div className="flex flex-col flex-1 gap-4 w-full max-w-2xl">
					<div className="px-4 py-6 rounded-xl flex flex-col gap-4 bg-card">
						<div className="grid grid-cols-2 gap-3">
							<Item variant="muted" className="bg-accent">
								<ItemActions><Users2 size={30} /></ItemActions>
								<ItemContent>
									<ItemTitle className="text-xl">2042</ItemTitle>
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
								<h3>100%</h3>
							</div>
							<div className="h-2 w-full rounded-full bg-primary"></div>
						</div>
					</div>
					<div className="flex flex-col items-center gap-6 py-4 px-6 bg-card rounded-xl">
						<img src="https://secure.gravatar.com/avatar/50db59beddbfed36a1646dae99ca7b2d?s=96&d=mm&r=g" className="rounded-full object-cover" width={100} alt="teacher" />
						<h3 className="text-xl">محمد امین سعیدی راد</h3>
						<Button size="lg">مشاهده پروفایل</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
