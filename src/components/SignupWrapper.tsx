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
import { authClient } from "@/lib/auth"
import { toast } from "react-hot-toast"
import { useTransition } from "react"

const formSchema = z.object({
	name: z.string("لطفا نام کاربری خود را وارد کنید").min(4, "حداقل ۴ کاراکتر برای نام کاربری وارد کنید"),
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
	const { pending: linkPending } = useLinkStatus();
	const [pending, startTransition] = useTransition();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { name, email, password } = values;
		startTransition(async () => {
			const { data, error } = await authClient.signUp.email({
				name,
				email,
				password,
				image: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
				callbackURL: process.env.NEXT_PUBLIC_BASE_URL
			});

			if (error) {
				if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
					toast.error("ایمیل در حاضر وجود دارد. از ایمیل دیگر استفاده کنید");
				} else if (error.code === "PASSWORD_TOO_SHORT") {
					toast.error("رمز عبور کوتاه است. حداقل ۶ کاراکتر وارد کنید");
				} else {
					toast.error("خطای ناشناخته ای رخ داد. بعدا امتحان کنید");
				}
			}
		})

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
						name="name"
						disabled={pending}
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
						disabled={pending}
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
						disabled={pending}
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
						disabled={pending}
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
					<Button disabled={pending} className="w-full text-lg" size="lg" type="submit">
						{pending && <Spinner />}
						ثبت نام
					</Button>
					<div>
						<p className="text-sm">قبلا ثبت نام کرده اید؟ <Link className="text-primary" href="/login">{linkPending && <Spinner className="inline" />} وارد شوید</Link></p>
					</div>
				</form>
			</Form>
			<div className="text-sm text-center px-10">
				با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات <Link className="text-primary" href="/">سبزلرن</Link> را پذیرفته اید.
			</div>
		</div>
	)
}