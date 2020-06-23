import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import FindGroup from '../../components/Group/FindGroup.component';
import {get, post} from '../../utils/api.utils';

const FindGroupPage = ({navigation}) => {
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';
	
	const [groupList, setGroupList] = useState([]);
	const [displayedGroupList, setDisplayedGroupList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);

	initializeAppLanguage();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const users = await get(`/groups/${userID}/joinable`);
				console.log(users);
				const userList = users['output_schema'].map(item => {
					return {
						id: item['group_id'],
						image: item['group_picture'],
						name: item['group_name'],
						description: item['group_description'],
						memberCount: item['member_count']
					}
				});
				setGroupList(userList);
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedGroupList([]);
		else setDisplayedGroupList(groupList.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const requestJoinGroup = async (groupID) => {
		try {
			const body = {
				'source_id': groupID,
				'requester_user_id': '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b'
			};
			const result = await post(`/groups/join-request`, body);
			console.log(result);
		} catch(error) {
			console.log(error.stack);
		};
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