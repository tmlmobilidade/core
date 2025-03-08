'use client';

import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

import ActionIcon from '../ActionIcon';

/**
 * Props for showing confirmation modal.
 */
interface ShowConfirmationProps {
	/**
	 * Label for the cancel button.
	 * @default 'Cancelar'
	 */
	cancelLabel?: string
	/**
	 * Label for the confirm button.
	 * @default 'Confirmar'
	 */
	confirmLabel?: string
	/**
	 * Message to display in the confirmation modal.
	 */
	confirmMessage: string
	/**
	 * Title of the confirmation modal.
	 */
	confirmTitle: string
	/**
	 * Callback function to execute when the cancel button is clicked.
	 */
	onCancel?: () => void
	/**
	 * Callback function to execute when the confirm button is clicked.
	 */
	onConfirm: () => void
	/**
	 * Flag to indicate if the confirmation modal should be shown.
	 */
	showConfirmation: true
}

/**
 * Props for hiding confirmation modal.
 */
interface HideConfirmationProps {
	/**
	 * Callback function to execute when the action icon is clicked.
	 */
	onClick: () => void
	/**
	 * Flag to indicate if the confirmation modal should be hidden.
	 */
	showConfirmation?: false | undefined
}

/**
 * Union type for confirmation props.
 */
type ConfirmationProps = HideConfirmationProps | ShowConfirmationProps;

export default function DeleteActionIcon(props: ConfirmationProps) {
	// A. Handlers
	const handleClick = () => {
		if (props.showConfirmation) {
			modals.openConfirmModal({
				children: props.confirmMessage,
				confirmProps: {
					color: 'var(--color-status-danger-primary)',
				},
				labels: { cancel: props.cancelLabel || 'Cancelar', confirm: props.confirmLabel || 'Confirmar' },
				onCancel: props.onCancel,
				onConfirm: props.onConfirm,
				title: props.confirmTitle,
			});
		}
		else {
			props.onClick();
		}
	};

	// C. Render
	return (
		<ActionIcon onClick={handleClick} variant="danger">
			<IconTrash />
		</ActionIcon>
	);
}
