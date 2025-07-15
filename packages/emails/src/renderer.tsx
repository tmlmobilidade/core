/* * */

import { render } from '@react-email/components';
import React from 'react';

/* * */

import { FailedBackupEmail, FailedBackupEmailProps } from './emails/failed-backup.js';
import { ResetPasswordEmail, ResetPasswordEmailProps } from './emails/reset-password.js';
import { SucessfulGtfsValidationEmail, SucessfulGtfsValidationEmailProps } from './emails/sucessful-gtfs-validation.js';
import { UnsuccessfulGtfsValidationEmail, UnsuccessfulGtfsValidationEmailProps } from './emails/unsucessful-gtfs-validation.js';
import { WelcomeEmail, WelcomeEmailProps } from './emails/welcome.js';

/* * */

export const RenderFailedBackupEmail = async (props: FailedBackupEmailProps) => {
	return await render(<FailedBackupEmail {...props} />);
};

export const RenderResetPasswordEmail = async (props: ResetPasswordEmailProps) => {
	return await render(<ResetPasswordEmail {...props} />);
};

export const RenderWelcomeEmail = async (props: WelcomeEmailProps) => {
	return await render(<WelcomeEmail {...props} />);
};

export const RenderSucessfulGtfsValidationEmail = async (props: SucessfulGtfsValidationEmailProps) => {
	return await render(<SucessfulGtfsValidationEmail {...props} />);
};

export const RenderUnsuccessfulGtfsValidationEmail = async (props: UnsuccessfulGtfsValidationEmailProps) => {
	return await render(<UnsuccessfulGtfsValidationEmail {...props} />);
};
