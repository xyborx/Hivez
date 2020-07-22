import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {where} from '../../utils/query.utils';
import GroupBillList from '../../components/Group/GroupBillList.component';
import {get} from '../../utils/api.utils';

const GroupBillListPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [displayedBillStatus, setDisplayedBillStatus] = useState('NOT_COMPLETED');
	const [billList, setBillList] = useState([]);
	const [displayedBillList, setDisplayedBill] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeGroupData(groupID, userData.id);
					const bills = await get(`/bills/groups/${groupID}/payable?user-id=${userData.id}`);
					const billLists = bills['output_schema'].map(item => {
						return {
							id: item['bill_id'],
							name: item['bill_description'],
							date: item['creation_date'],
							value: item['bill_amount'],
							status: item['approval_status'],
							approver: item['approver_name'],
						}
					});
					setBillList(billLists);
					setDisplayedBill(customSelectBill(billLists, displayedBillStatus));
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [])
	);

	const customSelectBill = (billList, status) => {
		if (status === 'COMPLETED') return where(billList, 'status', checkItem => checkItem === 'APPROVED');
		return where(billList, 'status', checkItem => checkItem !== 'APPROVED');
	};

	const onChangeDisplayedBillStatus = (status) => {
		setDisplayedBillStatus(status);
		const currentList = customSelectBill(billList, status);
		if(searchValue === '') setDisplayedBill(currentList);
		else setDisplayedBill(where(currentList, 'name', checkItem => checkItem.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0));
	};

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		const currentList = customSelectBill(billList, displayedBillStatus);
		if(searchQuery === '') setDisplayedBill(currentList);
		else setDisplayedBill(where(currentList, 'name', checkItem => checkItem.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0));
	};

	const navigateToBillPayment = (billID) => {
		navigation.navigate('GroupBillPayment', {
			billID: billID,
			groupID: groupID
		});
	};

	const navigateToBillDetail = (billID) => {
		navigation.navigate('GroupBillDetail', {
			billID: billID,
			groupID: groupID
		});
	};

	const createBill = () => {
		navigation.navigate('CreateGroupBill', {
			groupID: groupID
		});
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<GroupBillList
			contentText={translations['GroupBillList']}
			groupDetail={groupData}
			displayedBillStatus={displayedBillStatus}
			setDisplayedBillStatus={onChangeDisplayedBillStatus}
			billList={displayedBillList}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			navigateToBillPayment={navigateToBillPayment}
			navigateToBillDetail={navigateToBillDetail}
			createBill={createBill}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupBillListPage;