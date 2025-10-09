/* * */

import { IconInfoCircle } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface InputWrapperProps {
	children: React.ReactNode
	label: string
	name: string
	scope: string
	status: string
}

/* * */

export default function InputWrapper({ children, label, name, scope, status }: InputWrapperProps) {
	return (
		<>
			<div className={styles.inputLabelWrapper}>
				<label>{label}</label>
				<span><IconInfoCircle size={18} /></span>
			</div>
			{children}
		</>
	);
};
