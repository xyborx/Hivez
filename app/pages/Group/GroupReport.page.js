import React, {useContext, useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {LocalizationContext} from '../../utils/language.utils';
import {GroupContext} from '../../contexts/group.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {groupByDay, orderByDate, sum, where} from '../../utils/query.utils';
import GroupReport from '../../components/Group/GroupReport.component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {get} from '../../utils/api.utils';

const GroupReportPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const [groupDetail, setGroupDetail] = useState({
		id: groupID,
		image: '',
		name: '',
		description: '',
		allowSearchByName: false
	});
	const [reportDetail, setReportDetail] = useState({
		openingBalance: 0,
		inflow: 0,
		outflow: 0,
		endingBalance: 0
	});
	const [transactionList, setTransactionList] = useState([]);
	const [startDate, setStartDate] = useState(currentDate);
	const [endDate, setEndDate] = useState(currentDate);
	const [showReport, setShowReport] = useState(false);

	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const {initializeGroupData} = useContext(GroupContext);

	initializeAppLanguage();
	initializeGroupData(groupID).then(result => setGroupDetail(result));

	const transactionListFormatter = (transactionList) => {
		return groupByDay(orderByDate(transactionList, 'date'), 'date').map(item => {
			const income = sum(where(item.data, 'type', str => str === 'INCOME'), 'value');
			const expense = sum(where(item.data, 'type', str => str === 'EXPENSE'), 'value');
			return {...item, sum: income - expense};
		});
	};

	const onChangeStartDate = (startDate) => {
		const formattedDate = createDate(startDate);
		setStartDate(formattedDate);
	};

	const onChangeEndDate = (endDate) => {
		const formattedDate = createDate(endDate);
		setEndDate(formattedDate);
	};

	const resetDate = () => {
		const formattedStartDate = createDate(currentDate);
		const formattedEnd = createDate(currentDate);
		setStartDate(formattedStartDate);
		setEndDate(formattedEnd);
		setShowReport(false);
	};

	const viewReport = async () => {
		try {
			const transactions = await get(`groups/${groupID}/report?start-date=${createDate(startDate).format('YYYY-MM-DD')}&end-date=${createDate(endDate).format('YYYY-MM-DD')}`);
			setReportDetail({
				openingBalance: transactions['output_schema']['report_detail']['opening_balance'],
				inflow: transactions['output_schema']['report_detail']['inflow'],
				outflow: transactions['output_schema']['report_detail']['outflow'],
				endingBalance: transactions['output_schema']['report_detail']['ending_balance']
			});
			setTransactionList(
				transactionListFormatter(
					transactions['output_schema']['transaction_list'].map(transaction => {
						return {
							id: transaction['id'],
							name: transaction['description'],
							date: transaction['date'],
							requester: transaction['requester_name'],
							image: transaction['requester_picture'],
							type: transaction['type'],
							value: transaction['amount'],
							source: transaction['source']
						}
					})
				)
			);
			setShowReport(true);
		} catch (error) {
			console.log(error.stack);
		}
	};

	// TODO: Add logic
	const downloadReport = async () => {
		const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		if (isGranted) {	
			let options = {
				html: '<h1>Group Report </h1>',
				fileName: 'test',
				directory: 'Documents',
			};
		
			let file = await RNHTMLtoPDF.convert(options);
		}
	};

	const viewGroupBillDetail = (billID) => {
		navigation.navigate('GroupBillDetail', {
			billID: billID,
			groupID: groupID
		});
	};

	const viewGroupRequestDetail = (requestID) => {
		navigation.navigate('GroupRequestDetail', {
			requestID: requestID,
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
		<GroupReport
			contentText={translations['GroupReport']}
			groupDetail={groupDetail}
			reportDetail={reportDetail}
			transactionList={transactionList}
			startDate={startDate}
			setStartDate={onChangeStartDate}
			endDate={endDate}
			setEndDate={onChangeEndDate}
			showReport={showReport}
			resetDate={resetDate}
			viewReport={viewReport}
			downloadReport={downloadReport}
			viewGroupBillDetail={viewGroupBillDetail}
			viewGroupRequestDetail={viewGroupRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupReportPage;