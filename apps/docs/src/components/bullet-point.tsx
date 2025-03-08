import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function BulletPoint({ children, link }: { children: React.ReactNode, link?: string }) {
	return (
		<div className="flex gap-2 items-center">
			{children}
			{link && <Link href={link} target="_blank"><IconExternalLink className="hover:text-[var(--color-fd-primary)]" height={16} width={16} /></Link>}
		</div>
	);
}
