import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Star, User2, Users2 } from "lucide-react";
import Link from "next/link";

type Props = {
	title: string,
	img: string,
	desc: string
}

export default function CourseItem({ title, img, desc }: Props) {
	const price = 290000;
	return (
		<CardSpotlight className="rounded-lg overflow-hidden p-0">
			<Link href={`/courses/${Math.floor(Math.random() * 10)}`}>
				<img src={img} alt={title} className="w-full rounded-lg relative" />
			</Link>
			<div className="flex flex-col gap-5 p-7 relative">
				<div className="text-white">
					<Link href="#" className="text-xl">{title}</Link>
					<p className="text-sm text-muted-foreground mt-3">{desc}</p>
				</div>
				<div className="flex gap-4 items-center justify-between">	<Link href="#" className="text-sm inline-flex items-center gap-1 text-muted-foreground"><User2 size={17} /> محمدحسین اسدی</Link>
					<p className="text-sm text-yellow-500 inline-flex items-center gap-1">
						5.0
						<Star fill="orange" size={17} />
					</p>
				</div>
				<div className="flex gap-4 items-center justify-between">
					<div className="text-sm text-muted-foreground inline-flex items-center gap-1">
						<Users2 size={17} />
						<span>358</span>
					</div>
					<h3 className="text-sm">
						{Intl.NumberFormat("en-us", {
							style: "currency",
							currency: "usd",
						}).format(price)}
					</h3>
				</div>
			</div>
		</CardSpotlight>
	)
}
