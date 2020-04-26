import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxContainer, lightPageContainer, pageContent, rootContainer, rowComponent, textAlignLeft, textAlignRight, textHeader, textHighlight, textLink} from '../../styles/common.style';

export default StyleSheet.create({
	alignLeft: {
		...textAlignLeft
	},
	alignRight: {
		...textAlignRight
	},
	button: {
		marginTop: theme.PADDING_DEFAULT
	},
	boxContainer: {
		...boxContainer,
		flex: 1,
		maxWidth: theme.CONTAINER_WIDTH,
	},
	centerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	rootContainer: {
		...rootContainer,
		backgroundColor: theme.COLOR_LIGHT_GREY
	},
	header: {
		...textHeader,
		letterSpacing: theme.LETTER_SPACING_WIDE
	},
	headerContainer: {
		margin: theme.MARGIN_EXTRA_WIDE
	},
	link: {
		...textLink,
		alignSelf: 'flex-start',
		flex: 1,
		textAlign: 'center'
	},
	linkContainer: {
		...rowComponent,
		marginTop: theme.PADDING_WIDE
	},
	pageContainer: {
		...lightPageContainer
	},
	pageContentView: {
		...pageContent
	},
	policyContainer: {
		...rowComponent,
		padding: theme.PADDING_WIDE
	},
	scrollViewWrapper: {
		alignSelf: 'stretch',
		padding: 24
	},
	textField: {
		marginBottom: theme.MARGIN_NARROW
	},
	title: {
		...textHighlight,
		marginBottom: theme.PADDING_WIDE,
		textAlign: 'center'
	}
});