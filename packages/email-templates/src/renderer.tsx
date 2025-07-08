/* * */

import { render } from '@react-email/components';
import React from 'react';

/* * */

import { ResetPasswordEmail, ResetPasswordEmailProps } from './emails/reset-email';
import { WelcomeEmail, WelcomeEmailProps } from './emails/welcome';

/* * */

export const RenderResetPasswordEmail = (props: ResetPasswordEmailProps) => {
	return render(<ResetPasswordEmail {...props} />);
};

export const RenderWelcomeEmail = (props: WelcomeEmailProps) => {
	return render(<WelcomeEmail {...props} />);
};
