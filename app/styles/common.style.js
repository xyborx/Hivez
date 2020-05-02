import theme from './theme.style';

export const buttonDefault = {
	alignItems: 'center',
	backgroundColor: theme.COLOR_PRIMARY,
	borderRadius: theme.ROUNDNESS_DEFAULT,
	height: theme.HEIGHT_DEFAULT,
	justifyContent: 'center'
}

export const buttonDisabled = {
	...buttonDefault,
	backgroundColor: theme.COLOR_DARK_GREY
}

export const basicContainer = {
	flex: 1
}

export const boxContainer = {
	backgroundColor: theme.COLOR_WHITE,
	borderRadius: theme.ROUNDNESS_DEFAULT,
	padding: theme.PADDING_DEFAULT,
	shadowColor: theme.COLOR_BLACK
}

export const boxShadow = {
	shadowColor: theme.COLOR_BLACK,
	shadowOffset: {
		width: 0,
		height: 1,
	},
	shadowOpacity: 0.22,
	shadowRadius: 2.22,
	elevation: 1.5,
}

export const centerContainer = {
	...basicContainer,
	justifyContent: 'center',
	alignItems: 'center'
}

export const dropdown = {
	backgroundColor: theme.COLOR_WHITE,
	borderColor: theme.COLOR_GREY,
	borderRadius: theme.ROUNDNESS_EXTRA_MINIMUM,
	borderWidth: theme.BORDER_MEDIUM,
	height: theme.HEIGHT_DEFAULT,
	justifyContent: 'center'
}

export const iconButton = {
	color: theme.COLOR_BLACK,
	fontSize: theme.ICON_SIZE_LARGE
}

export const iconInline = {
	color: theme.COLOR_GREY,
	fontSize: theme.ICON_SIZE_MEDIUM,
	textAlign: 'center'
}

export const inputText = {
	backgroundColor: theme.COLOR_LIGHT_GREY,
	borderColor: theme.COLOR_GREY,
	borderWidth: theme.BORDER_MEDIUM,
	borderRadius: theme.ROUNDNESS_DEFAULT,
	fontSize: theme.FONT_SIZE_MEDIUM,
	height: theme.HEIGHT_DEFAULT,
	paddingHorizontal: theme.PADDING_DEFAULT
}

export const inputTextDisabled = {
	...inputText,
	backgroundColor: 'transparent',
	borderColor: 'transparent'
}

export const inputTextInvalid = {
	...inputText,
	borderColor: theme.COLOR_LIGHT_RED
}

export const modalContainer = {
	alignItems: 'center',
	justifyContent: 'center',
}

export const modalContentContainer = {
	alignSelf: 'center',
	alignItems: 'center',
	justifyContent: 'center',
	padding: theme.PADDING_WIDE,
	paddingBottom: theme.PADDING_NARROW
}

export const modalScrollViewContainer = {
	alignSelf: 'center',
	borderRadius: theme.ROUNDNESS_EXTRA_MINIMUM
}

export const modalWrapper = {
	backgroundColor: theme.COLOR_WHITE,
	borderRadius: theme.ROUNDNESS_EXTRA_MINIMUM,
	flex: 1,
	maxHeight: theme.CONTAINER_WIDTH,
	maxWidth: theme.CONTAINER_WIDTH
}

export const pageContainer = {
	flex: 1
}

export const pageContent = {
	alignItems: 'center',
	flexGrow: 1,
	justifyContent: 'center'
}

export const rootContainer = {
	flex: 1,
	flexGrow: 1,
	backgroundColor: theme.PAGE_BACKGROUND_LIGHT
}

export const rowComponent = {
	...basicContainer,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'flex-start'
}

export const textAlignLeft = {
	textAlign: 'left'
};

export const textAlignRight = {
	textAlign: 'right'
};

export const textAppTitle = {
	color: theme.COLOR_PRIMARY,
	fontSize: theme.FONT_SIZE_TITLE,
	fontWeight: theme.FONT_WEIGHT_BOLD,
	textAlign: 'center'
};

export const textContent = {
	color: theme.COLOR_BLACK,
	fontSize: theme.FONT_SIZE_MEDIUM,
	fontWeight: theme.FONT_WEIGHT_MEDIUM
};

export const textPageHeader = {
	color: theme.COLOR_PRIMARY,
	fontSize: theme.FONT_SIZE_HEADER,
	fontWeight: theme.FONT_WEIGHT_BOLD
}

export const textPageSubHeader = {
	color: theme.COLOR_LIGHT_BLACK,
	fontSize: theme.FONT_SIZE_MEDIUM,
	fontWeight: theme.FONT_WEIGHT_MEDIUM
}

export const textHighlight = {
	color: theme.COLOR_PRIMARY,
	fontSize: theme.FONT_SIZE_MEDIUM,
	fontWeight: theme.FONT_WEIGHT_BOLD
};

export const textLink = {
	color: theme.COLOR_PRIMARY,
	fontSize: theme.FONT_SIZE_MEDIUM,
	fontWeight: theme.FONT_WEIGHT_BOLD
};

export const textError = {
	color: theme.COLOR_DARK_RED,
	fontSize: theme.FONT_SIZE_MEDIUM,
	fontWeight: theme.FONT_WEIGHT_BOLD
};