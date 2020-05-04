import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDisabled, iconInline, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	default: {
		backgroundColor: theme.COLOR_LIGHT_GREY,
		borderColor: theme.COLOR_GREY,
		borderWidth: theme.BORDER_MEDIUM,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		height: theme.HEIGHT_DEFAULT,
		justifyContent: 'center',
		paddingHorizontal: theme.PADDING_DEFAULT
	},
	disabled: {
		...buttonDisabled
	},
	text: {
		color: theme.COLOR_SOFT_GREY,
		flex: 1,
		flexGrow: 1,
		fontSize: theme.FONT_SIZE_MEDIUM,
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	hidden: {
		display: 'none'
	},
	iconContainer: {
		width: 18,
		marginRight: theme.MARGIN_NARROW
	},
	inputIcon: {
		...iconInline
	}
});