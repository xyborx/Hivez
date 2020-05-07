import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDisabled, iconInline} from '../../styles/common.style';

export default StyleSheet.create({
	default: {
		backgroundColor: theme.COLOR_LIGHT_GREY,
		borderColor: theme.COLOR_GREY,
		borderWidth: theme.BORDER_MEDIUM,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flexDirection: 'row',
		height: theme.HEIGHT_DEFAULT,
		overflow: 'hidden'
		// paddingHorizontal: theme.PADDING_DEFAULT
	},
	disabled: {
		...buttonDisabled
	},
	text: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		textAlign: 'center'
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	},
	container: {
		alignItems: 'center',
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center'
	},
	hidden: {
		display: 'none'
	},
	iconContainer: {
		alignSelf: 'center',
		width: 18
	},
	inputIcon: {
		...iconInline
	}
});