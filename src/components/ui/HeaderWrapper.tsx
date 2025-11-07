import React from "react";
import Header from "./Header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cart, categories as catsTable, courses } from "@/db/schema";
import { getUserCart } from "@/lib/actions";
import { inArray } from "drizzle-orm";

export default async function HeaderWrapper() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	const categories = await db.select().from(catsTable);
	return <Header session={session} categories={categories} />
}
