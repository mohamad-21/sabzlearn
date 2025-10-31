import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 min-h-screen px-6">
			<h1 className="lg:text-3xl text-2xl">
				متاسفانه صفحه مورد نظر شما پیدا نشد
			</h1>
			<Link href="/">
				<Button>بازگشت به صفحه اصلی</Button>
			</Link>
		</div>
	)
}
