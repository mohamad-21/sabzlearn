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
import { authClient } from "@/lib/auth"
import { ChevronLeft } from "lucide-react"
import Link, { useLinkStatus } from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"
import { Spinner } from "./ui/spinner"
import { Spotlight } from "./ui/spotlight-new"

const formSchema = z.object({
	email: z.email("یک ایمیل معتبر وارد کنید."),
	password: z.string("لطفا رمز عبور خود را وارد کنید")
})

export default function LoginWrapper() {
	const router = useRouter();
	const { pending: linkPending } = useLinkStatus();
	const [pending, startTransition] = useTransition();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "mohamad21@gmail.com",
			password: "123456"
		},
	})
	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			const { data, error } = await authClient.signIn.email({
				email: values.email,
				password: values.password,
				rememberMe: true,
				callbackURL: "http://localhost:3000"
			});

			if (error) {
				if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
					toast.error("ایمیل یا رمز عبور نامعتبر است");
				} else {
					toast.error("خطای ناشناخته ای رخ داد. بعدا امتحان کنید");
				}
				return;
			}
			toast.success("به حساب خود وارد شدید.");
		})
	}

	return (
		<div className="flex flex-col gap-7 min-h-screen items-center justify-center relative overflow-hidden py-10 px-6">
			<Button variant="outline" className="absolute left-5 top-5" size="icon-lg" onClick={() => router.back()}><ChevronLeft /></Button>
			<Spotlight height={1500} />
			<img src="/sublogo.svg" alt="logo" className="w-full max-w-[250px]" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm bg-card py-8 px-6 rounded-md space-y-5">
					<h2 className="text-2xl font-bold text-center mb-10">ورود با ایمیل</h2>
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
					<Button className="w-full text-lg" size="lg" type="submit" disabled={pending}>
						{pending && <Spinner />}
						ورود
					</Button>
					<div>
						<p className="text-sm">حساب کاربری ندارید؟‌ <Link className="text-primary" href="/signup">{linkPending && <Spinner className="inline" />} ثبت نام</Link></p>
					</div>
				</form>
			</Form>
			<div className="text-sm text-center px-10">
				با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات <Link className="text-primary" href="/">سبزلرن</Link> را پذیرفته اید.
			</div>
		</div>
	)
}