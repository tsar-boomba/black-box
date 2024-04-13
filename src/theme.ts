'use client';

import { createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const theme = createTheme({
	cursorType: 'pointer',
	primaryColor: 'dark',
});
export const vars = themeToVars(theme);
