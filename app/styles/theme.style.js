const border = {
	BORDER_WIDTH_THIN: 0.5,
	BORDER_WIDTH_MEDIUM: 1,
	BORDER_WIDTH_THICK: 2,
}

const button = {
	BUTTON_RADIUS: 6,
	BUTTON_HEIGHT: 40
}

const color = {
	COLOR_PRIMARY: '#FFC60B',
	COLOR_BLACK: '#333333',
	COLOR_GREY: '#F8F8F8',
	COLOR_RED: '#C81912',
	BACKGROUND_LIGHT: '#F8F8F8',
	BORDER_COLOR_GREY: 'rgba(112, 112, 112, 0.5)'
}

const font = {
	FONT_SIZE_SMALL: 12,
	FONT_SIZE_MEDIUM: 14,
	FONT_SIZE_LARGE: 16,
	FONT_SIZE_HEADER: 48,
	FONT_WEIGHT_LIGHT: '200',
	FONT_WEIGHT_MEDIUM: '500',
	FONT_WEIGHT_BOLD: '700'
}

const input = {
	INPUT_RADIUS: 6,
	INPUT_HEIGHT: 40
}

export default {
	...border,
	...button,
	...color,
	...font,
	...input
};