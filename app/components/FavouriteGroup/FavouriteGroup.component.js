import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useDimensions} from '@react-native-community/hooks'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import GroupCard from '../GroupCard/GroupCard.component';
import theme from '../../styles/theme.style';
import styles from './FavouriteGroup.component.style';

const FavouriteGroup = (props) => {
	const [currentIndex, SetCurrentIndex] = useState(0);
    const [displayDetails, setDisplayDetails] = useState(true);
	const {width} = useDimensions().window;
	const [carousel, setCarousel] = useState({});

	return (
		<View style={props.style}>
			<Text style={props.groupList.length ? styles.hidden : styles.noFavouriteGroup}>{props.contentText['NO_FAVOURITE_GROUP']}</Text>
			<Carousel
				data={props.groupList}
				inactiveSlideScale={0.75}
				itemWidth={width - (theme.MARGIN_DEFAULT * 2)}
				onSnapToItem={SetCurrentIndex}
				ref={setCarousel}
				sliderWidth={width}
				renderItem={({item}) => {
					return (
						<GroupCard
							contentText={props.contentText}
							displayDetails={displayDetails}
							expandable={true}
							groupData={item}
							onItemClick={props.onItemClick}
							setDisplayDetails={setDisplayDetails} />
					);
				}} />
            <Pagination
				activeDotIndex={currentIndex}
				carouselRef={carousel}
				dotColor={theme.COLOR_PRIMARY}
				dotsLength={props.groupList.length}
				dotStyle={styles.dotStyle}
				inactiveDotColor={theme.COLOR_GREY}
				inactiveDotScale={0.75}
				tappableDots={true} />
		</View>
	);
}

export default FavouriteGroup;