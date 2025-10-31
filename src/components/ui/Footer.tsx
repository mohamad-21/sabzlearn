import { Mail, SendIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className="pt-20 pb-8 px-10 bg-card">
			<div className="flex flex-col gap-20">
				<div className="grid gap-5 border-b pb-12">
					<img src="/sublogo.svg" alt="sabzlearn" width={200} />
					<div className="flex gap-10 text-sm">
						<p className="text-muted-foreground flex items-center gap-2"><Mail /> info@sabzlearn.ir</p>
						<p className="text-muted-foreground flex items-center gap-2"><SendIcon /> @sabzlearn_support</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-8">
					<div>
						<h2 className="sm:text-2xl text-lg sm:mb-5 mb-3">درباره سبزلرن</h2>
						<p className="text-muted-foreground max-w-md">
							شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی،با خیال راحت و بدون استرس میتونی از مسیر لذت ببری. ما در سبزلرن، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از نتیجه زحمات مون لذت ببریم.
						</p>
					</div>
					<div className="flex gap-8">
						<div>
							<h2 className="sm:text-2xl text-lg sm:mb-5 mb-3">دوره های پیشنهادی</h2>
							<ul className="flex flex-col gap-3">
								<li><Link href="#" className="text-muted-foreground text-sm">آموزش HTML</Link></li>
								<li><Link href="#" className="text-muted-foreground text-sm">آموزش CSS</Link></li>
								<li><Link href="#" className="text-muted-foreground text-sm">آموزش جاوااسکریپت</Link></li>
								<li><Link href="#" className="text-muted-foreground text-sm">آموزش PHP</Link></li>
							</ul>
						</div>
						<div>
							<img src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/enamad.png" alt="enamad" className="sm:max-w-full max-w-[140px]" />
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-6 sm:flex-row flex-col">
					<h3>کلیه حقوق مادی و معنوی سایت برای سبز لرن محفوظ است.</h3>
					<p>Created by <a className="text-primary" href="https://github.com/mohamad-21/sabzlearn" target="_blank">Mohamad21</a></p>
				</div>
			</div>
		</footer>
	)
}
