import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	header: {
		...textPageHeader,
		marginVertical: theme.MARGIN_EXTRA_WIDE,
		textAlign: 'center'
	},
	notificationListContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		overflow: 'hidden',
		paddingTop: theme.PADDING_NARROW
	},
	notificationListContent: {
		borderRadius: theme.ROUNDNESS_DEFAULT,
		overflow: 'hidden'
	},
	pageContainer: {
		flexGrow: 1,
		overflow: 'hidden'
	},
	rootContainer: {
		...rootContainer
	}
});