import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	customSection: {
		marginVertical: theme.MARGIN_NARROW
	},
	header: {
		...textHighlight,
		marginBottom: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	listText: {
		marginBottom: theme.MARGIN_NARROW
	},
	modalWrapper: {
		flex: 1,
	},
	section: {
		marginBottom: theme.MARGIN_WIDE
	},
	text: {
		textAlign: 'justify'
	}
});