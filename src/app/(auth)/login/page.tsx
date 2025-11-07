import LoginWrapper from "@/components/LoginWrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (session?.session) {
		redirect(process.env.BASE_URL!);
	}

	return (
		<LoginWrapper />
	)
}
