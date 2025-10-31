import React from "react";

type Props = {
	params: Promise<{ catId: string }>
}

export default async function CategroyPage({ params }: Props) {
	const { catId } = await params;

	return (
		<div>

		</div>
	)
}
