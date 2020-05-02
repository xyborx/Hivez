const color = {
	COLOR_PRIMARY: '#FFC60B',
	COLOR_LIGHT_BLACK: '#4E4E4E',
	COLOR_BLACK: '#333333',
	COLOR_BLACK_OVERLAY: 'rgba(0,0,0,0.8)',
	COLOR_GREEN: '#30D000',
	COLOR_LIGHT_GREY: '#F8F8F8',
	COLOR_GREY: 'rgba(112, 112, 112, 0.5)',
	COLOR_DARK_GREY: '#DEDEDE',
	COLOR_SOFT_GREY: '#444',
	COLOR_LIGHT_RED: 'rgba(200, 25, 18, 0.5)',
	COLOR_RED: '#FF5F5F',
	COLOR_DARK_RED: '#C81912',
	COLOR_WHITE: '#FFFFFF',
	OVERLAY_OPACITY: 0.8,
	PAGE_BACKGROUND_LIGHT: '#FAFAFA'
}

const font = {
	FONT_SIZE_EXTRA_SMALL: 6,
	FONT_SIZE_SMALL: 12,
	FONT_SIZE_MEDIUM: 14,
	FONT_SIZE_LARGE: 18,
	FONT_SIZE_SUB_HEADER: 24,
	FONT_SIZE_HEADER: 32,
	FONT_SIZE_TITLE: 64,
	FONT_WEIGHT_LIGHT: '200',
	FONT_WEIGHT_MEDIUM: '500',
	FONT_WEIGHT_SEMI_BOLD: '600',
	FONT_WEIGHT_BOLD: '700',
	FLAG_HEIGHT_SMALL: 12,
	FLAG_HEIGHT_MEDIUM: 18,
	FLAG_HEIGHT_LARGE: 24,
	FLAG_WIDTH_SMALL: 18,
	FLAG_WIDTH_MEDIUM: 27,
	FLAG_WIDTH_LARGE: 36,
	ICON_SIZE_SMALL: 12,
	ICON_SIZE_MEDIUM: 14,
	ICON_SIZE_LARGE: 16,
	ICON_SIZE_EXTRA_LARGE: 24,
	LETTER_SPACING_NARROW: 4,
	LETTER_SPACING_DEFAULT: 8,
	LETTER_SPACING_WIDE: 16
}

const roundness = {
	ROUNDNESS_SQUARE: 0,
	ROUNDNESS_EXTRA_MINIMUM: 6,
	ROUNDNESS_MINIMUM: 8,
	ROUNDNESS_DEFAULT: 16,
	ROUNDNESS_MAXIMUM: 24
}

const size = {
	BORDER_THIN: 0.5,
	BORDER_MEDIUM: 1,
	BORDER_THICK: 2,
	CONTAINER_WIDTH: 500,
	HEIGHT_SHORT: 40,
	HEIGHT_DEFAULT: 44,
	HEIGHT_TALL: 48,
	MARGIN_TINY: 2,
	MARGIN_EXTRA_NARROW: 4,
	MARGIN_NARROW: 8,
	MARGIN_DEFAULT: 16,
	MARGIN_WIDE: 24,
	MARGIN_EXTRA_WIDE: 40,
	PADDING_EXTRA_NARROW: 4,
	PADDING_NARROW: 8,
	PADDING_DEFAULT: 16,
	PADDING_WIDE: 24,
	PADDING_EXTRA_WIDE: 40,
	ACTION_BUTTON_SIZE: 48,
	ACTION_BUTTON_ON_FOCUS_SIZE: 40
}

export default {
	...color,
	...font,
	...roundness,
	...size,
};