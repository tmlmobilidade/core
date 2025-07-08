/* * */

import { render } from '@react-email/components';
import React from 'react';

/* * */

import { FailedBackupEmail, FailedBackupEmailProps } from './emails/failed-backup';
import { ResetPasswordEmail, ResetPasswordEmailProps } from './emails/reset-password';
import { SucessfulGtfsValidationEmail, SucessfulGtfsValidationEmailProps } from './emails/sucessful-gtfs-validation';
import { UnsuccessfulGtfsValidationEmail, UnsuccessfulGtfsValidationEmailProps } from './emails/unsucessful-gtfs-validation';
import { WelcomeEmail, WelcomeEmailProps } from './emails/welcome';

/* * */

export const RenderFailedBackupEmail = (props: FailedBackupEmailProps) => {
	return render(<FailedBackupEmail {...props} />);
};

export const RenderResetPasswordEmail = (props: ResetPasswordEmailProps) => {
	return render(<ResetPasswordEmail {...props} />);
};

export const RenderWelcomeEmail = (props: WelcomeEmailProps) => {
	return render(<WelcomeEmail {...props} />);
};

export const RenderSucessfulGtfsValidationEmail = (props: SucessfulGtfsValidationEmailProps) => {
	return render(<SucessfulGtfsValidationEmail {...props} />);
};

export const RenderUnsuccessfulGtfsValidationEmail = (props: UnsuccessfulGtfsValidationEmailProps) => {
	return render(<UnsuccessfulGtfsValidationEmail {...props} />);
};
