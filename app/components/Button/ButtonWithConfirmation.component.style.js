import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDefault, buttonDisabled, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	contentContainer: {
		alignItems: 'center',
		alignSelf: 'stretch',
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center'
	},
	default: {
		...buttonDefault
	},
	disabled: {
		...buttonDisabled
	},
	modalContainer: {
		alignItems: 'center',
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		flexDirection: 'row',
		height: 40,
		justifyContent: 'center'
	},
	text: {
		...textHighlight,
		color: theme.COLOR_WHITE,
		width: '100%',
		textAlign: 'center'
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	}
});