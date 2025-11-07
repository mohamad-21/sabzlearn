"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchForCourses() {
	const router = useRouter();
	const [search, setSearch] = useState("");

	const onSearch = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/courses?s=${search}`);
		setSearch("");
	}

	return (
		<form className="w-full max-w-lg relative z-[1]" onSubmit={onSearch}>
			<Input type="text" className="p-7 pl-12 !text-base w-full bg-background" placeholder="جست و جو در بین دوره ها..." onChange={e => setSearch(e.target.value)} value={search} />
			<div className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
				<Search />
			</div>
		</form>
	)
}
