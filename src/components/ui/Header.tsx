"use client";

import { cart as cartTb, categories as catsTable, courses } from "@/db/schema";
import { authClient } from "@/lib/auth";
import { navlinks } from "@/lib/constants";
import { Session, User } from "better-auth";
import { LogOut, MenuIcon, User2, XIcon } from "lucide-react";
import Link, { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import CartOverview from "../CartOverview";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Spinner } from "./spinner";
import ThemeToggle from "./ThemeToggle";

type Props = {
	session: {
		session: Session
		user: User
	} | null
	categories: typeof catsTable.$inferSelect[]
}

export default function Header({ session, categories }: Props) {
	const [turnBgOn, setTurnBgOn] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const { pending: linkPending } = useLinkStatus();
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	const user = session?.user;

	const onSignout = async () => {
		startTransition(async () => {
			const { data, error } = await authClient.signOut()
			if (error) {
				toast.error("مشکلی هنگام خروج از حساب پیش آمد. لطفا دوباره امتحان کنید.")
				return;
			}
			setShowSidebar(false);
			router.refresh();
		});
	}

	useEffect(() => {
		function onScroll() {
			if (window.scrollY > 0) {
				setTurnBgOn(true);
			} else {
				setTurnBgOn(false);
			}
		}

		onScroll();

		document.addEventListener("scroll", onScroll);

		return () => {
			document.removeEventListener("scroll", onScroll);
		}
	}, []);

	return (
		<>
			<header className={`flex items-center justify-center py-4 px-6 ${turnBgOn ? "bg-background/50 backdrop-blur-md" : ""} fixed top-0 left-0 w-full z-[2]`}>
				<nav className="flex items-center gap-10 w-full max-w-5xl justify-between">
					<div className="flex items-center gap-6">
						<Link href="/">
							<img src="/logo.svg" alt="logo" width={50} />
						</Link>
						<DropdownMenu dir="rtl" >
							<ul className="hidden sm:flex items-center gap-6">
								{navlinks.map(link => (
									<li key={link.title}>
										{link.links ? (
											<>
												<DropdownMenuTrigger asChild>
													<Link href="#">{link.title}</Link>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="w-56">
													{categories.map(cat => (
														<DropdownMenuItem className="text-base" key={cat.id} asChild>
															<Link href={`/courses?category=${cat.id}`} className="flex w-full px-2 py-1 capitalize">{cat.name.split("_").join(" ")}</Link>
														</DropdownMenuItem>
													))}
												</DropdownMenuContent>
											</>
										) : (
											<Link href={link.href} className="inline-flex items-center gap-2">{linkPending && <Spinner />} {link.title}</Link>
										)}
									</li>
								))}
							</ul>
						</DropdownMenu>
					</div>
					<div className="flex items-center gap-3">
						<ThemeToggle />
						<CartOverview />
						<div className="hidden sm:flex items-center gap-3">
							{user ? (
								<Button onClick={onSignout} disabled={pending}>
									{pending && <Spinner />}
									<LogOut />
									خروج
								</Button>
							) : (
								<Link href="/login">
									<Button>
										{linkPending && <Spinner />}
										<User2 />
										ورود / عضویت
									</Button>
								</Link>
							)}
						</div>
						<Button className="flex sm:hidden" variant="outline" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
							<MenuIcon />
						</Button>
					</div>
				</nav>
			</header>
			<aside className={`fixed inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center z-[5] p-6 ${showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-300`}>
				<Button className="absolute top-8 right-8" size="icon" variant="outline" onClick={() => setShowSidebar(false)}>
					<XIcon />
				</Button>
				<div className="flex flex-col items-center justify-center h-full gap-15">
					<img src="/logo.svg" alt="logo" width={50} />
					<DropdownMenu dir="rtl">
						<ul className="flex flex-col items-center gap-15">
							{navlinks.map(link => (
								<li key={link.title}>
									{link.links ? (
										<>
											<DropdownMenuTrigger asChild>
												<Link href="#">{link.title}</Link>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-56">
												{categories.map(cat => (
													<DropdownMenuItem className="text-base" key={cat.id} asChild>
														<Link href={`/courses?category=${cat.id}`} onClick={() => setShowSidebar(false)} className="flex w-full px-2 py-1 capitalize">{cat.name.split("_").join(" ")}</Link>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</>
									) : (
										<Link href={link.href} onClick={() => setShowSidebar(false)} className="inline-flex items-center gap-2">{linkPending && <Spinner />} {link.title}</Link>
									)}
								</li>
							))}
						</ul>
					</DropdownMenu>

					{user ? (
						<Button onClick={onSignout} disabled={pending}>
							{pending && <Spinner />}
							<LogOut />
							خروج
						</Button>
					) : (
						<Link href="/login" onClick={() => setShowSidebar(false)}>
							<Button>
								{linkPending && <Spinner />}
								<User2 />
								ورود / عضویت
							</Button>
						</Link>
					)}
				</div>
			</aside>
		</>
	)
}
