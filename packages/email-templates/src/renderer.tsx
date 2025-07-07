/* * */

import { render } from '@react-email/components';
import React from 'react';

/* * */

import { ResetPasswordEmail } from './emails/reset-email';

/* * */

export const RenderResetPasswordEmail = (props: Parameters<typeof ResetPasswordEmail>[0]) => {
	return render(<ResetPasswordEmail {...props} />);
};
