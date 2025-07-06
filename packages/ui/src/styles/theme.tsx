/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';

/* * */

import '@/styles/font.css';
import '@/styles/index.css';

/* * */

import '@/styles/themes/ocean.css';
import '@/styles/themes/park.css';
import '@/styles/themes/path.css';
import '@/styles/themes/pool.css';
import '@/styles/themes/royal.css';
import '@/styles/themes/street.css';

/* * */

import { Button, createTheme, MantineThemeOverride, PasswordInput, SegmentedControl, Skeleton, Slider, Switch, Text, Textarea, TextInput } from '@mantine/core';

/* * */

import ButtonOverride from '@/styles/mantine/Button.module.css';
import PasswordInputOverride from '@/styles/mantine/PasswordInput.module.css';
import SegmentedControlOverride from '@/styles/mantine/SegmentedControl.module.css';
import SkeletonOverride from '@/styles/mantine/Skeleton.module.css';
import SliderOverride from '@/styles/mantine/Slider.module.css';
import SwitchOverride from '@/styles/mantine/Switch.module.css';
import TextOverride from '@/styles/mantine/Text.module.css';
import TextareaOverride from '@/styles/mantine/Textarea.module.css';
import TextInputOverrideSm from '@/styles/mantine/TextInput-sm.module.css';
import TextInputOverride from '@/styles/mantine/TextInput.module.css';

/* * */

export const themeData: MantineThemeOverride = createTheme({
	components: {

		Button: Button.extend({
			classNames: {
				...ButtonOverride,
			},
		}),

		PasswordInput: PasswordInput.extend({
			classNames: {
				// PasswordInput is very similar to TextInput. The only difference is that
				// the 'input' field is wrapped by an outer div, with the class '.input'.
				// The actual 'input' field is named '.innerInput'. It is necessary to
				// map the 'input' field styles to the '.innerInput' class and apply reset styles
				// to the '.input' class, otherwise the input will appear to be rendered twice.
				innerInput: TextInputOverride.input,
				input: PasswordInputOverride.input,
				root: TextInputOverride.root,
				wrapper: TextInputOverride.wrapper,
			},
		}),

		SegmentedControl: SegmentedControl.extend({
			classNames: {
				...SegmentedControlOverride,
			},
		}),

		Skeleton: Skeleton.extend({
			classNames: {
				...SkeletonOverride,
			},
		}),

		Slider: Slider.extend({
			classNames: {
				...SliderOverride,
			},
		}),

		Switch: Switch.extend({
			classNames: {
				...SwitchOverride,
			},
		}),

		Text: Text.extend({
			classNames: {
				...TextOverride,
			},
		}),

		Textarea: Textarea.extend({
			classNames: {
				...TextareaOverride,
			},
		}),

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

	},
});
