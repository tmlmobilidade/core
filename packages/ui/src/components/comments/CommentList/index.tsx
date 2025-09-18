'use client';

/* * */

import styles from './styles.module.css';

import { CommentItem, CommentItemProps } from '../CommentItem';

/* * */

export function CommentList({ data }: { data: CommentItemProps[] }) {
	//
	// B. Render components

	if (!data) return null;

	return (
		<div className={styles.container}>
			{data.map((comment, index) =>
				<CommentItem key={index} {...comment} />,
			)}
		</div>
	);
}
