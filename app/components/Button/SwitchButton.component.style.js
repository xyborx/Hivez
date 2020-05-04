import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {buttonDefault, buttonDisabled, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
    container: {
		...buttonDisabled,
        flexDirection: 'row'
    },
	default: {
        ...buttonDefault,
        flex: 1
	},
	disabled: {
		...buttonDisabled
	},
	text: {
		...textHighlight,
		color: theme.COLOR_WHITE
	},
	textDisabled: {
		color: theme.COLOR_SOFT_GREY
	}
});