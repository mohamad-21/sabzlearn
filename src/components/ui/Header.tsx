"use client";

import { navlinks } from "@/lib/constants";
import Link, { useLinkStatus } from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { Search, Handbag, User2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

export default function Header() {
	const [turnBgOn, setTurnBgOn] = useState(false);
	const { pending } = useLinkStatus();

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
		<header className={`flex items-center justify-center py-4 px-6 ${turnBgOn ? "bg-background/50 backdrop-blur-md" : ""} fixed top-0 left-0 w-full z-[2]`}>
			<nav className="flex items-center gap-10 w-full max-w-5xl justify-between">
				<div className="flex items-center gap-6">
					<Link href="/">
						<img src="/logo.svg" alt="logo" width={50} />
					</Link>
					<DropdownMenu dir="rtl">
						<ul className="flex items-center gap-6">
							{navlinks.map(link => (
								<li key={link.title}>
									{link.links ? (
										<>
											<DropdownMenuTrigger asChild>
												<Link href="#">{link.title}</Link>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-56">
												{link.links?.map(item => (
													<DropdownMenuItem className="text-base" key={item.href}>
														<Link href={item.href} className="flex w-full px-2 py-1">{item.title}</Link>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</>
									) : (
										<Link href={link.href} className="inline-flex items-center gap-2">{pending && <Spinner />} {link.title}</Link>
									)}
								</li>
							))}
						</ul>
					</DropdownMenu>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" size="icon">
						<Search />
					</Button>
					<ThemeToggle />
					<Link href="/cart">
						<Button variant="outline" size="icon">
							<Handbag />
						</Button>
					</Link>
					<Link href="/login">
						<Button>
							{pending && <Spinner />}
							<User2 />
							ورود / عضویت
						</Button>
					</Link>
				</div>
			</nav>
		</header>
	)
}
