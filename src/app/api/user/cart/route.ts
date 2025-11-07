import { getUserCart } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session?.user) {
		return NextResponse.json({
			ok: false,
			message: "session is not set"
		}, { status: 401 });
	}

	const { cartCourses } = await getUserCart(session?.user.id, { includeCourses: true });

	return NextResponse.json({
		ok: true,
		data: cartCourses
	})
}