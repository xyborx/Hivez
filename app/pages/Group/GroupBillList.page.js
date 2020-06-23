import React, {useContext, useState, useEffect} from 'react';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {where} from '../../utils/query.utils';
import GroupBillList from '../../components/Group/GroupBillList.component';
import {get} from '../../utils/api.utils';

const GroupBillListPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const userID = '2b1f6b98-b281-11ea-a278-3ca82aaa2b5b';

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: ''
	});
	const [displayedBillStatus, setDisplayedBillStatus] = useState('NOT_COMPLETED');
	const [billList, setBillList] = useState([]);
	const [displayedBillList, setDisplayedBill] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	const customSelectBill = (billList, status) => {
		if (status === 'COMPLETED') return where(billList, 'status', checkItem => checkItem === 'APPROVED');
		return where(billList, 'status', checkItem => checkItem !== 'APPROVED');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const bills = await get(`/bills/groups/${groupID}/payable?user-id=${userID}`);
				console.log(bills);
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
		};
		fetchData();
	}, []);

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
			groupDetail={groupDetail}
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