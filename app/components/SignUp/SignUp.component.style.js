import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxContainer, boxShadow, pageContainer, pageContent, rootContainer, rowComponent, textAlignLeft, textAlignRight, textAppTitle, textHighlight, textLink} from '../../styles/common.style';

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
		...boxShadow,
		flex: 1,
		maxWidth: theme.CONTAINER_WIDTH,
		overflow: 'hidden'
	},
	centerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	rootContainer: {
		...rootContainer
	},
	header: {
		...textAppTitle,
		letterSpacing: theme.LETTER_SPACING_WIDE
	},
	headerContainer: {
		margin: theme.MARGIN_EXTRA_WIDE
	},
	hidden: {
		display: 'none'
	},
	link: {
		...textLink,
		textAlign: 'center'
	},
	linkButton: {
		flex: 1,
	},
	linkContainer: {
		...rowComponent,
		marginTop: theme.PADDING_WIDE
	},
	modalLink: {
		flex: 1
	},
	modalLinkContainer: {
		alignSelf: 'center'
	},
	pageContainer: {
		...pageContainer
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
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.PADDING_WIDE,
		textAlign: 'center'
	}
});