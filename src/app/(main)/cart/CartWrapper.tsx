"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { courses } from "@/db/schema";
import { addStudentToCourse, removeCartItem } from "@/lib/actions";
import { User } from "better-auth";
import { ArrowUpLeft, Banknote, Handbag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
	cartCourses?: typeof courses.$inferSelect[];
	user: User
}

export default function CartWrapper({ cartCourses, user }: Props) {
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	let totalPrice = 0;
	cartCourses?.forEach(course => {
		totalPrice += course.price;
	})

	async function onPayAction() {
		startTransition(async () => {
			if (!cartCourses?.length) return;
			const { err } = await addStudentToCourse(user.id, cartCourses!.map(course => course.id))
			if (err) {
				toast.error(err);
				return;
			}
			toast.success("پرداخت شما موفقیت آمیز بود. دوره ها با موفقیت خریداری شدن")
			router.refresh();
		})
	}

	async function onDeleteItem(courseId: number) {
		startTransition(async () => {
			const { err } = await removeCartItem(courseId);
			if (err) {
				toast.error(err);
				return;
			}
			toast.success("دوره مورد نظر از سبد خرید حذف شد");
			router.refresh();
		})
	}

	return (
		<div className="flex lg:flex-row flex-col lg:items-start items-center gap-7 py-20 w-full max-w-5xl">
			<div className="w-full flex flex-col gap-3 rounded-lg overflow-hidden flex-2 bg-card">
				<div className="flex items-center py-3 px-4 bg-primary">
					<h2 className="text-lg flex items-center gap-3">
						<Handbag />
						سبد خرید
					</h2>
				</div>
				<div className="px-6 py-6">
					{cartCourses?.length ? (
						<ul className="w-full flex flex-col sm:gap-6 gap-10">
							{cartCourses?.map(course => (
								<li className="flex sm:flex-row flex-col justify-between gap-5 w-full" key={course.id}>
									<div className="flex sm:flex-row flex-col sm:items-center gap-5">
										<img src={course.cover} className="w-[180px] rounded-lg" alt={course.title} />
										<h3 className="text-sm max-w-[180px]">{course.title}</h3>
									</div>
									<div className="flex items-center gap-5">
										<p className="text-muted-foreground">{course.price.toLocaleString()} تومان</p>
										<Button variant="destructive" size="icon" onClick={async () => await onDeleteItem(course.id)} disabled={pending}>
											{pending ? <Spinner /> : <Trash2 />}
										</Button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className="flex sm:flex-row flex-col sm:items-center justify-between gap-3">
							<h2 className="text-lg">هنوز دوره ای در سبد اضافه نکردید</h2>
							<Link href="/courses">
								<Button variant="outline">مشاهده دوره ها <ArrowUpLeft className="size-5" /></Button>
							</Link>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-3 rounded-lg overflow-hidden flex-1 lg:sticky top-0 left-0 bottom-0 max-h-[800px] bg-card w-full">
				<div className="flex items-center py-3 px-4 bg-primary">
					<h2 className="text-lg flex items-center gap-3"><Banknote /> اطلاعات پرداخت</h2>
				</div>
				<div className="p-6 flex flex-col gap-8">
					<div className="flex items-center justify-between gap-3">
						<h3 className="">تعداد دوره ها</h3>
						<p className="text-muted-foreground">{cartCourses?.length}</p>
					</div>
					<div className="flex items-center justify-between gap-3">
						<h3 className="">مبلغ کل</h3>
						<p className="text-muted-foreground">{totalPrice.toLocaleString()} تومان</p>
					</div>
					<div className="flex items-center justify-between gap-3">
						<h3 className="">مجموع تخفیف</h3>
						<p className="text-muted-foreground">0%</p>
					</div>
					<div className="flex items-center justify-between gap-3">
						<h3 className="">مجموع</h3>
						<p className="text-primary font-bold">{totalPrice.toLocaleString()} تومان</p>
					</div>
				</div>
				<div className="p-6">
					<Button variant={cartCourses?.length ? "default" : "outline"} size="lg" onClick={onPayAction} className="w-full text-base flex items-center gap-1" disabled={pending || !cartCourses?.length}>
						پرداخت <ArrowUpLeft className="size-5" />
					</Button>
				</div>
			</div>
		</div>
	)
}
