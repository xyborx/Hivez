import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {groupByDay, orderByDate, sum, where} from '../../utils/query.utils';
import EventReport from '../../components/Event/EventReport.component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFetchBlob from 'rn-fetch-blob';
import Share from "react-native-share";
import {get} from '../../utils/api.utils';

const EventReportPage = ({route, navigation}) => {
	const {eventID} = route.params;

	const {eventData, initializeEventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [reportDetail, setReportDetail] = useState({
		totalExpense: 0
	});
	const [transactionList, setTransactionList] = useState([]);

	const transactionListFormatter = (transactionList) => {
		return groupByDay(orderByDate(transactionList, 'date'), 'date').map(item => ({...item, sum: sum(item.data, 'value')}));
	};

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeEventData(eventID, userData.id);
					const transactions = await get(`events/${eventID}/report}`);
					setReportDetail({
						totalExpense: transactions['output_schema']['total_expense']
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
									source: transaction['source'],
									approver: ''
								}
							})
						)
					);
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [eventID])
	);

	const viewPaymentSettlement = () => {
		navigation.navigate('PaymentSettlement', {
			eventID: eventID
		});
	};

	const downloadReport = async () => {
		const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		if (isGranted) {
			const style =
			`<style>
				table, th, td {border: 1px solid black;}
			</style>`;

			const header =
			`<h1>Event Report ${eventData.name}</h1>`;

			const table =
			`<table style='width:100%'>
				<tr>
					<th>Tanggal</th>
					<th>Deskripsi</th>
					<th>Pengeluaran</th>
					<th>Pengaju</th>
					<th>Penyetuju</th>
				<tr>
				${transactionList.map(transactions => {
					return `<tr>
						<td rowspan='${transactions.data.length}'>${createDate(transactions.id).format('DD-MM-YYYY')}</td>
						<td>${transactions.data[0].name}</td>
						<td>${rupiahFormatting(transactions.data[0].value)}</td>
						<td>${transactions.data[0].requester}</td>
						<td>${transactionDetail.approver}</td>
					</tr>
					${transactions.data.length > 1 ? transactions.data.slice(1).map(transactionDetail => {
						return `<tr>
							<td>${transactionDetail.name}</td>
							<td>${rupiahFormatting(transactions.data[0].value)}</td>
							<td>${transactionDetail.requester}</td>
							<td>${transactionDetail.approver}</td>
						</tr>`
					}).join('') : ''}
				`}).join('')}
			</table>`;

			let options = {
				html: `${style}${header}${table}`,
				fileName: 'Report'
			};
		
			let file = await RNHTMLtoPDF.convert(options);

			const shareOptions = {
				message: 'message',
				title: 'title',
				url: `file://${file.filePath}`
			};
			Share.open(shareOptions).then(res => console.log(res)).catch(err => console.log(err));
		}
	};

	const viewEventRequestDetail = (requestID) => {
		navigation.navigate('EventRequestDetail', {
			requestID: requestID,
			eventID: eventID
		});
	};

	const goBack = () => {
		navigation.replace('EventList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<EventReport
			contentText={translations['EventReport']}
			eventDetail={eventData}
			reportDetail={reportDetail}
			transactionList={transactionList}
			viewPaymentSettlement={viewPaymentSettlement}
			downloadReport={downloadReport}
			viewEventRequestDetail={viewEventRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default EventReportPage;