import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {pageContainer, pageContent, rootContainer} from '../../styles/common.style';

export default StyleSheet.create({
	boxContainer: {
		flex: 1,
	},
	button: {
		// flex: 1
	},
	rootContainer: {
		...rootContainer,
		padding: theme.PADDING_EXTRA_WIDE,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	image: {
		flex: 1,
		flexGrow: 1
		// height: 200
	}
});