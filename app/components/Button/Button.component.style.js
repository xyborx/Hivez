import {StyleSheet} from 'react-native';
import {buttonDefault, buttonDisabled, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	default: {
		...buttonDefault
	},
	disabled: {
		...buttonDisabled
	},
	text: {
		...textHighlight
	}
});