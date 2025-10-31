import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
	title: string
	subtitle?: string
	link?: {
		title: string
		href: string
	},
	direction?: "row" | "col"
}

export default function SectionHeader({ title, subtitle, link, direction = "row" }: Props) {
	return (
		<div className={`flex ${direction === "row" ? "flex-row items-center justify-between" : "flex-col"} gap-4 pb-10`}>
			<h2 className="lg:text-3xl text-2xl">{title}</h2>
			{(link && !subtitle) && (
				<Link href={link.href} className="inline-flex gap-1 text-muted-foreground">{link.title} <ArrowUpLeft /></Link>

			)}
			{(subtitle && !link) && (
				<p className="text-muted-foreground max-w-lg">{subtitle}</p>
			)}
		</div>
	)
}
