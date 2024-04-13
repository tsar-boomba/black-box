import { vars } from '@/theme';
import { style } from '@vanilla-extract/css';

const BREAKPOINT = '(max-width: 755px)';

export const title = style({
	fontFamily: `Greycliff CF, ${vars.fontFamily}`,
	fontSize: 40,
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
			fontSize: 28,
			lineHeight: 1.2,
		},
	},
});
