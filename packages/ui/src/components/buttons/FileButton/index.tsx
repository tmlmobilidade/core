'use client';

/* * */

import { Button, type ButtonProps } from '@/components/buttons/Button';
import { IconUpload } from '@tabler/icons-react';
import React, { useState } from 'react';

/* * */

interface FileButtonProps extends ButtonProps {
	accept?: string
	disabled?: boolean
	icon?: React.ReactNode
	label: string
	loading?: boolean
	onCancel?: () => void
	onFileChange?: (file: File) => void
}

/* * */

export function FileButton({ accept, disabled, icon, label, loading, onCancel, onFileChange, ...props }: FileButtonProps) {
	//

	//
	// A. Setup variables

	const [isLoading, setIsLoading] = useState(loading ?? false);

	//
	// B. Handle actions

	const handleFileSelect = async () => {
		setIsLoading(true);
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = accept ?? '';
		input.onchange = (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				onFileChange?.(file);
			}
			setIsLoading(false);
		};

		input.oncancel = () => {
			setIsLoading(false);
			onCancel?.();
		};

		input.click();
	};

	const handleButtonClick = () => {
		handleFileSelect();
	};

	//
	// C. Render components

	return (
		<Button
			disabled={disabled || isLoading}
			icon={icon ?? <IconUpload />}
			label={label}
			loading={isLoading}
			onClick={handleButtonClick}
			{...props}
		/>
	);

	//
}
