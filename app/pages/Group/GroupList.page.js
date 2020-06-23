import React, {useContext, useRef, useState, useEffect} from 'react';
import {useScrollToTop} from '@react-navigation/native';
import {LocalizationContext} from '../../utils/language.utils';
import GroupList from '../../components/Group/GroupList.component';
import {get} from '../../utils/api.utils';

const GroupListPage = ({navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const [groupList, setGroupList] = useState([]);
	const [displayedGroupList, setDisplayedGroupList] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	
	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await get(`/users/${userID}/groups`);
				const groupList = data['output_schema'].map(item => {
					return {
						id: item['group_id'],
						image: item['group_picture'],
						name: item['group_name'],
						memberCount: item['member_count']
					}
				});
				setGroupList(groupList);
				setDisplayedGroupList(groupList);
			} catch (error) {
				console.log(error.stack);
			};
		};
		fetchData();
	}, []);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedGroupList(groupList);
		else setDisplayedGroupList(groupList.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	}

	const navigateToGroup = (groupID) => {
		navigation.navigate('GroupDrawer', {
			screen: 'GroupDetail',
			initial: true,
			params: {groupID: groupID}
		});
	};

	const createGroup = () => {
		navigation.navigate('CreateGroup');
	}

	const findGroup = () => {
		navigation.navigate('FindGroup');
	}

	return (
		<GroupList
			scrollRef={scrollRef}
			contentText={translations['GroupList']}
			groupList={displayedGroupList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			onGroupClick={navigateToGroup}
			findGroup={findGroup}
			createGroup={createGroup} />
	);
};

export default GroupListPage;