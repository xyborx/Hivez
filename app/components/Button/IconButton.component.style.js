import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {} from '../../styles/common.style';

export default StyleSheet.create({
	icon: {
		height: 24,
		width: 24,
		resizeMode: 'contain'
	},
	text: {
		alignItems: 'center',
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
    },
});