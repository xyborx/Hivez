import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDefault, buttonDisabled, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
    container: {
		...buttonDisabled,
		flexDirection: 'row',
		overflow: 'hidden'
    },
	default: {
        ...buttonDefault,
		flex: 1,
		borderRadius: 0
	},
	disabled: {
		...buttonDisabled
	},
	leftFlat: {
		borderTopRightRadius: theme.ROUNDNESS_DEFAULT,
		borderBottomRightRadius: theme.ROUNDNESS_DEFAULT
	},
	rightFlat: {
		borderTopLeftRadius: theme.ROUNDNESS_DEFAULT,
		borderBottomLeftRadius: theme.ROUNDNESS_DEFAULT
	},
	text: {
		...textHighlight,
		color: theme.COLOR_WHITE
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	}
});