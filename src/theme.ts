'use client';

import { Button, Input, Text, Title, createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const theme = createTheme({
	cursorType: 'pointer',
	autoContrast: true,
	primaryColor: 'gray',
	primaryShade: 0,
	components: {
		Button: Button.extend({
			styles: {
				label: {
					color: 'black',
				},
			},
		}),
		Text: Text.extend({
			styles: {
				root: {
					color: 'white',
				},
			},
		}),
		Title: Title.extend({
			styles: {
				root: {
					color: 'white',
				},
			},
		}),
	},
});
export const vars = themeToVars(theme);
