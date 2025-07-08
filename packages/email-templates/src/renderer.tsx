/* * */

import { render } from '@react-email/components';
import React from 'react';

/* * */

import { ResetPasswordEmail, ResetPasswordEmailProps } from './emails/reset-email';

/* * */

export const RenderResetPasswordEmail = (props: ResetPasswordEmailProps) => {
	return render(<ResetPasswordEmail {...props} />);
};
