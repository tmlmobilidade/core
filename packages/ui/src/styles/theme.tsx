/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';

/* * */

import '@/styles/font.css';
import '@/styles/index.css';

/* * */

import { Button, createTheme, MantineThemeOverride, PasswordInput, Textarea, TextInput } from '@mantine/core';

/* * */

import ButtonOverride from '@/styles/mantine/Button.module.css';
import PasswordInputOverride from '@/styles/mantine/PasswordInput.module.css';
import TextInputOverrideSm from '@/styles/mantine/TextInput-sm.module.css';
import TextInputOverride from '@/styles/mantine/TextInput.module.css';

/* * */

export const themeData: MantineThemeOverride = createTheme({
	components: {

		/* * */

		Button: Button.extend({
			classNames: () => {
				const defaultClasses = {
					...ButtonOverride,
				};
				return defaultClasses;
			},
		}),

		/* * */

		PasswordInput: PasswordInput.extend({
			classNames: () => {
				const defaultClasses = {
					// PasswordInput is very similar to TextInput. The only difference is that
					// the 'input' field is wrapped by an outer div, with the class '.input'.
					// The actual 'input' field is named '.innerInput'. It is necessary to
					// map the 'input' field styles to the '.innerInput' class and apply reset styles
					// to the '.input' class, otherwise the input will appear to be rendered twice.
					innerInput: TextInputOverride.input,
					input: PasswordInputOverride.input,
					root: TextInputOverride.root,
					wrapper: TextInputOverride.wrapper,
				};
				return defaultClasses;
			},
		}),

		/* * */

		Textarea: Textarea.extend({
			classNames: (_, props) => {
				const defaultClasses = {
					...TextInputOverride,
					...(props.size === 'sm' && TextInputOverrideSm),
					...(props.variant === 'white' && {
						input: TextInputOverrideSm.variantWhite,
						section: TextInputOverrideSm.variantWhite,
					}),
				};
				return defaultClasses;
			},
		}),

		/* * */

		TextInput: TextInput.extend({
			classNames: (_, props) => {
				const defaultClasses = {
					...TextInputOverride,
					...(props.size === 'sm' && TextInputOverrideSm),
					...(props.variant === 'white' && {
						input: TextInputOverrideSm.variantWhite,
						section: TextInputOverrideSm.variantWhite,
					}),
				};
				return defaultClasses;
			},
		}),

		/* * */

	},
});
