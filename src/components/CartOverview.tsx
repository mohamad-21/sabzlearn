import { courses } from "@/db/schema";
import { PopoverContent } from "@radix-ui/react-popover";
import { Handbag, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";
import { ApiResponse } from "@/lib/types/fetch.types";
import { removeCartItem } from "@/lib/actions";
import toast from "react-hot-toast";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartOverview() {
	const [cart, setCart] = useState<typeof courses.$inferSelect[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	const updateCartData = async () => {
		startTransition(async () => {
			const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/cart`);
			const { ok, data }: ApiResponse<typeof courses.$inferSelect[]> = await resp.json();
			setCart(data);
		})
	}

	const onDeleteItem = async (courseId: number) => {
		startTransition(async () => {
			const { err } = await removeCartItem(courseId);
			if (err) {
				toast.error(err);
				return;
			}
			router.refresh();
			toast.success("دوره مورد نظر از سبد خرید حذف شد");
			updateCartData();
		});
	}

	useEffect(() => {
		updateCartData();
	}, []);

	useEffect(() => {
		let total = 0;
		cart?.forEach(item => {
			total += item.price;
		});
		setTotalPrice(total);
	}, [cart]);

	return (
		<Popover onOpenChange={open => {
			if (open) {
				updateCartData();
			}
		}}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Handbag />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="sm:w-[360px] w-[300px] translate-x-20 translate-y-3 bg-card rounded-lg overflow-hidden">
				<div className="flex items-center justify-between gap-4 bg-accent py-2.5 px-5">
					<h3 className="text-base">سبد خرید من</h3>
					<p className="text-muted-foreground">{cart?.length} دوره</p>
				</div>
				<div className="flex flex-col items-center gap-3 py-6 px-5 border-b border-b-muted">

					{
						pending ? (
							<Spinner />
						) : (
							cart?.length ? (
								cart?.map(course => (
									<div className="flex items-center justify-between w-full gap-3" key={course.id}>
										<div className="flex items-center gap-3">
											<img src={course.cover} width={80} alt={course.title} />
											<div className="flex flex-col gap-1">
												<h4 className="text-xs">{course.title}</h4>
												<p className="text-muted-foreground text-xs">{course.price.toLocaleString()} تومان</p>
											</div>
										</div>
										<Button variant="destructive" disabled={pending} size="icon" onClick={async () => await onDeleteItem(course.id)}>
											{pending ? <Spinner /> : <Trash2 />}
										</Button>
									</div>
								))
							) : (
								<div className="flex items-center justify-center">سبد خرید شما خالیه</div>
							)
						)
					}
				</div>
				<div className="flex flex-col gap-4 py-3 px-5">
					<div className="flex items-center justify-between gap-3 mt-3">
						<h4 className="text-sm">مبلغ قابل پرداخت</h4>
						<p className="text-sm text-primary">
							{
								cart?.length ? totalPrice.toLocaleString() : 0
							} تومان
						</p>
					</div>
					<Link href="/cart">
						<Button className="w-full">مشاهده سبد خرید</Button>
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	)
}
