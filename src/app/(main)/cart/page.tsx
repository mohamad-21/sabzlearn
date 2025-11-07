import { Button } from "@/components/ui/button";
import { getUserCart } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { Handbag, Trash2 } from "lucide-react";
import { headers } from "next/headers";
import CartWrapper from "./CartWrapper";

export default async function Cart() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session?.user) {
		return (
			<div className="flex py-20 w-full max-w-5xl">
				<h2 className="text-2xl">برای استفاده از سبد خرید باید وارد حساب خود بشید</h2>
			</div>
		)
	}

	const { cartCourses } = await getUserCart(session.user.id, { includeCourses: true });

	return (
		<CartWrapper user={session?.user} cartCourses={cartCourses} />
	)
}
