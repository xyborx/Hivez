import React, {useContext, useRef, useState, useCallback} from 'react';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import GroupList from '../../components/Group/GroupList.component';
import {get} from '../../utils/api.utils';

const GroupListPage = ({navigation}) => {
	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [refreshing, setRefreshing] = useState(false);
	const [groupList, setGroupList] = useState([]);
	const [displayedGroupList, setDisplayedGroupList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const fetchData = () => {
		return new Promise ((resolve, reject) => {
			(async () => {
				try {
					const data = await get(`/users/${userData.id}/groups`);
					resolve(
						data['output_schema'].map(item => {
							return {
								id: item['group_id'],
								image: item['group_picture'],
								name: item['group_name'],
								memberCount: item['member_count']
							}
						})
					);
				} catch (error) {
					console.log(error.stack);
					reject(error);
				};
			})();
		});
	};

	useFocusEffect(
		useCallback(() => {
			showSpinner();
			fetchData().then(result => {
				setGroupList(result);
				setDisplayedGroupList(result);
				hideSpinner();
			});
		}, [])
	);

	const onRefresh = useCallback(() => {
		showSpinner();
		fetchData().then(result => {
			setGroupList(result);
			setDisplayedGroupList(result);
			hideSpinner();
		});
	}, [refreshing]);

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDisplayedGroupList(groupList);
		else setDisplayedGroupList(groupList.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	}

	const navigateToGroup = async (groupID) => {
		showSpinner();
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
			refreshing={refreshing}
			onRefresh={onRefresh}
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