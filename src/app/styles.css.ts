import { vars } from '@/theme';
import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

const BREAKPOINT = '(max-width: 755px)';

export const wrapper = style({
	position: 'relative',
	boxSizing: 'border-box',
});

export const inner = style({
	position: 'relative',
	paddingTop: 220,
	paddingBottom: 120,

	'@media': {
		[BREAKPOINT]: {
			paddingBottom: 40,
			paddingTop: 80,
		},
	},
});

export const title = style({
	fontFamily: `Greycliff CF, ${vars.fontFamily}`,
	fontSize: 62,
	fontWeight: 900,
	lineHeight: 1.1,
	margin: 0,
	padding: 0,
	textAlign: 'center',
	color: vars.colors.black,

	selectors: {
		[vars.darkSelector]: {
			color: vars.colors.white,
		},
	},

	'@media': {
		[BREAKPOINT]: {
			fontSize: 42,
			lineHeight: 1.2,
		},
	},
});

export const description = style({
	textAlign: 'center',
	marginTop: vars.spacing.xl,
	fontSize: 24,

	'@media': {
		[BREAKPOINT]: {
			fontSize: 18,
		},
	},
});

export const control = style({
	marginTop: `calc(${vars.spacing.xl} * 2)`,

	'@media': {
		[BREAKPOINT]: {
			marginTop: vars.spacing.xl,
		},
	},
});

export const s = style({
	paddingLeft: 38,
	paddingRight: 38,

	'@media': {
		[BREAKPOINT]: {
			fontSize: rem(20),
			paddingLeft: 18,
			paddingRight: 18,
		},
	},
});
