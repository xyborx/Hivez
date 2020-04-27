import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {modalContainer, modalContentContainer, modalScrollViewContainer, modalWrapper} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		margin: theme.MARGIN_DEFAULT,
		marginTop: theme.MARGIN_NARROW
	},
	modalContainer: {
		...modalContainer
	},
	modalContentContainer: {
		...modalContentContainer
	},
	modalScrollViewContainer: {
		...modalScrollViewContainer
	},
	modalWrapper: {
		...modalWrapper
	}
});