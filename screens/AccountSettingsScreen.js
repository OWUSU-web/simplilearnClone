import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ImageBackground, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars'; // Import Calendar from react-native-calendars

// Import your background image from assets
import backgroundImage from '../asset/k.jpg';

const AccountSettingsScreen = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToCoursesPurchased = () => {
    navigation.navigate('CoursesPurchased');
  };

  const navigateToCoursesCompleted = () => {
    navigation.navigate('CoursesCompleted');
  };

  const navigateToCoursesInProgress = () => {
    navigation.navigate('CoursesInProgress');
  };

  const toggleCalendarModal = () => {
    setShowCalendar(!showCalendar);
  };

  const togglePlatformDropdown = () => {
    setShowPlatformDropdown(!showPlatformDropdown);
  };

  const selectPlatform = (platform) => {
    // Open the platform URL
    Linking.openURL(platform.url);
    togglePlatformDropdown(); // Close dropdown after selection
  };

  // List of classroom platforms
  const platforms = [
    { id: '1', name: 'Zoom', url: 'https://zoom.com' },
    { id: '2', name: 'Slack', url: 'https://slack.com' },
    { id: '3', name: 'WhatsApp', url: 'https://whatsapp.com' },
    // Add more platforms as needed
  ];

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.option} onPress={navigateToEditProfile}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToCoursesPurchased}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Courses Purchased</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToCoursesCompleted}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Courses Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToCoursesInProgress}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Courses in Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={toggleCalendarModal}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Calendar</Text>
          <Icon name="calendar-outline" size={24} color="#007bff" style={[styles.optionIcon, { fontWeight: 'bold' }]} />
        </TouchableOpacity>
        {/* Dropdown Button for Classroom Platforms */}
        <TouchableOpacity style={styles.option} onPress={togglePlatformDropdown}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Classroom Platforms</Text>
          <Icon name={showPlatformDropdown ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="#007bff" style={[styles.optionIcon, { fontWeight: 'bold' }]} />
        </TouchableOpacity>

        {/* Display Platform Options */}
        {showPlatformDropdown && (
          <View style={styles.platformDropdown}>
            <FlatList
              data={platforms}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownOption} onPress={() => selectPlatform(item)}>
                  <Text style={[styles.optionText, { color: 'black' }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Modal for displaying Calendar */}
        <Modal visible={showCalendar} animationType="slide">
          <View style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Calendar</Text>
              <Button title="Close" onPress={toggleCalendarModal} />
            </View>
            <View style={{ flex: 1 }}>
              <Calendar
                // react-native-calendars component
                markedDates={{
                  '2024-07-01': { marked: true, dotColor: 'green' },
                  '2024-07-02': { marked: true, dotColor: 'green' },
                  '2024-07-03': { marked: true, dotColor: 'green' },
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    flex: 1,
    color: '#ffffff', // Text color adjusted for readability on the background
  },
  optionIcon: {
    marginLeft: 10,
    color: '#007bff', // Blue color for the icon
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  platformDropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AccountSettingsScreen;
