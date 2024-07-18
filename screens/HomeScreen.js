import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || { username: 'Guest' }; // Default username if not provided

  const [images, setImages] = useState([
    require('../asset/z.jpg'),
    require('../asset/s.jpg'),
    require('../asset/n.jpg'),
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex });
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const renderSlide = ({ item }) => (
    <Image source={item} style={styles.slideImage} resizeMode="cover" />
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { opacity: index === currentIndex ? 1 : 0.3 },
          ]}
        />
      ))}
    </View>
  );

  // Custom Header component
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('Profile')} // Replace 'Profile' with your actual profile screen route
      >
        <Icon name="person-circle-outline" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Hi, {username}</Text>
    </View>
  );

  const handleTopCategoriesPress = () => {
    navigation.navigate('AllCourses'); // Navigate to 'AllCourses' screen when clicking on Top Categories
  };

  return (
    <ImageBackground 
      source={require('../asset/v.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Header />

      <View style={styles.container}>
        {/* Profile Dashboard with Search */}
        <View style={styles.dashboard}>
          <Text style={styles.subText}>What would you like to learn today?</Text>
          <TouchableOpacity style={styles.dashboardRight}>
            <Icon name="search" size={25} color="#000" style={styles.icon} />
          </TouchableOpacity>

          {/* Dashboard and Features Items in Horizontal Line */}
          <View style={[styles.itemsContainer, { marginTop: 10 }]}>
            <TouchableOpacity style={styles.dashboardItem} onPress={handleTopCategoriesPress}>
              <Icon name="grid" size={30} color="#000" />
              <Text style={styles.dashboardItemText}>Top Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dashboardItem}>
              <Icon name="book" size={30} color="#000" />
              <Text style={styles.dashboardItemText}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dashboardItem}>
              <Icon name="laptop" size={30} color="#000" />
              <Text style={styles.dashboardItemText}>Online Bootcamp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Slideshow view */}
        <View style={styles.slideshowContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderSlide}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToIndex({ index: info.index, animated: true });
                }
              });
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems && viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index || 0);
              }
            }}
            initialScrollIndex={currentIndex}
          />
          {renderDots()}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10, // Adjusted padding to move the dashboard to the top
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dashboard: {
    marginTop: 20, // Adjusted margin to move the dashboard to the top
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  subText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  dashboardRight: {
    alignSelf: 'flex-end',
  },
  icon: {
    marginLeft: 15,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  slideshowContainer: {
    height: 200,
    marginTop: 20,
    position: 'relative',
  },
  slideImage: {
    width: width,
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
  },
  dashboardItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dashboardItemText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  profileIcon: {
    alignSelf: 'center',
  },
});

export default HomeScreen;
