import {StyleSheet} from 'react-native';
import {textAlignLeft, textAlignRight, textHeader, textHighlight, textLink} from '../../styles/common.style';

export default StyleSheet.create({
	alignLeft: {
		...textAlignLeft
	},
	alignRight: {
		...textAlignRight
	},
	button: {
		marginVertical: 8
	},
	container: {
		flex: 1
	},
	header: {
		...textHeader,
		letterSpacing: 16
	},
	link: {
		...textLink,
		alignSelf: 'flex-start',
		paddingHorizontal: 8
	},
	textField: {
		marginVertical: 8,
		paddingHorizontal: 16
	},
	title: {
		...textHighlight,
		marginVertical: 32,
		textAlign: 'center'
	}
});