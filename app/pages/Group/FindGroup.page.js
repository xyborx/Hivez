import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../../contexts/language.context';
import {PopUpContext} from '../../contexts/popup.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import FindGroup from '../../components/Group/FindGroup.component';
import {get, post} from '../../utils/api.utils';

const FindGroupPage = ({navigation}) => {
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showPopUp} = useContext(PopUpContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [groupList, setGroupList] = useState([]);
	const [displayedGroupList, setDisplayedGroupList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(useCallback(() => {
		const fetchData = async () => {
			showSpinner();
			try {
				const groups = await get(`/groups/${userData.id}/joinable`);
				const groupList = groups['output_schema'].map(item => {
					return {
						id: item['group_id'],
						image: item['group_picture'],
						name: item['group_name'],
						description: item['group_description'],
						memberCount: item['member_count']
					}
				});
				setGroupList(groupList);
			} catch (error) {
				console.log(error.stack);
			};
			hideSpinner();
		};
		fetchData();
	}, []));

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedGroupList([]);
		else setDisplayedGroupList(groupList.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const requestJoinGroup = async (groupID) => {
		showSpinner();
		try {
			const body = {
				'source_id': groupID,
				'requester_user_id': userData.id
			};
			const result = await post(`/groups/join-request`, body);
			if (result === null) showPopUp('No Connection');
			else showPopUp(result['error_schema']['error_message'][appLanguage === 'en' ? 'english' : 'indonesian']);
		} catch(error) {
			console.log(error.stack);
		};
		hideSpinner();
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<FindGroup
			contentText={translations['FindGroup']}
			confirmJoinText={translations['ConfirmJoinGroup']}
			groupList={displayedGroupList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			goBack={goBack}
			requestJoinGroup={requestJoinGroup} />
	);
};

export default FindGroupPage;