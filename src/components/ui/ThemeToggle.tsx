"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const onThemeChange = (val: string) => {
		setTheme(val);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="dark:hidden" />
					<Moon className="hidden dark:block" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{["light", "dark", "system"].map(theme => (
					<DropdownMenuItem key={theme} onClick={() => onThemeChange(theme)} className="capitalize">
						{theme}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
