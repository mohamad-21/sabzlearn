
export default function StatsCard({ image, number, text }: { image: string, number: string | number, text: string }) {
	return (
		<div className="flex flex-col items-center gap-6">
			<img src={image} alt={text} className="bg-foreground rounded-2xl p-3 dark:bg-transparent dark:rounded-none dark:p-0" />
			<div className="flex flex-col text-center">
				<h3 className="text-3xl font-bold">{number}</h3>
				<h3 className="text-xl font-bold">{text}</h3>
			</div>
		</div>
	)
}
