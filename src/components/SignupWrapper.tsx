"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spotlight } from "./ui/spotlight-new"
import Link, { useLinkStatus } from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"

const formSchema = z.object({
	username: z.string("لطفا نام کاربری خود را وارد کنید").min(4, "حداقل ۴ کاراکتر برای نام کاربری وارد کنید"),
	email: z.email("یک ایمیل معتبر وارد کنید."),
	password: z.string("لطفا رمز عبور خود را وارد کنید"),
	confirmPassword: z.string("لطفا تکرار رمز عبور را وارد کنید")
})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'رمز عبور ها با هم مطابقت ندارند',
				path: ["confirmPassword"],
			})
		}
	})

export default function SignupWrapper() {

	const router = useRouter();
	const { pending } = useLinkStatus();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}
	// ...

	return (
		<div className="flex flex-col gap-7 min-h-screen items-center justify-center relative overflow-hidden py-10 px-6">
			<Button variant="outline" className="absolute left-5 top-5" size="icon-lg" onClick={() => router.back()}><ChevronLeft /></Button>
			<Spotlight height={1500} />
			<img src="/sublogo.svg" alt="logo" className="w-full max-w-[250px]" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm bg-card py-8 px-6 rounded-md space-y-5">
					<h2 className="text-2xl font-bold text-center mb-10">ثبت نام</h2>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>نام کاربری</FormLabel>
								<FormControl>
									<Input placeholder="نام کاربری خود را وارد کنید" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ایمیل</FormLabel>
								<FormControl>
									<Input placeholder="ایمیل خود را وارد کنید" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>رمز عبور</FormLabel>
								<FormControl>
									<Input placeholder="رمز عبور خود را وارد کنید" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>تکرار رمز عبور</FormLabel>
								<FormControl>
									<Input placeholder="تکرار رمز عبور را وارد کنید" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}

					/>
					<Button className="w-full text-lg" size="lg" type="submit">ثبت نام</Button>
					<div>
						<p className="text-sm">قبلا ثبت نام کرده اید؟ <Link className="text-primary" href="/login">{pending && <Spinner className="inline" />} وارد شوید</Link></p>
					</div>
				</form>
			</Form>
			<div className="text-sm text-center px-10">
				با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات <Link className="text-primary" href="/">سبزلرن</Link> را پذیرفته اید.
			</div>
		</div>
	)
}