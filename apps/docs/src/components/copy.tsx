'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { Badge } from '@tmlmobilidade/ui';
import { useEffect, useState } from 'react';

export default function Copy({ text }: { text: string }) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		}
	}, [isCopied]);

	return (
		<Badge
			variant={isCopied ? 'success' : 'primary'}
			onClick={() => {
				navigator.clipboard.writeText(text);
				setIsCopied(true);
			}}
		>
			{isCopied ? <IconCheck /> : <IconCopy />}
		</Badge>
	);
}
