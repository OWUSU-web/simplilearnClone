import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your image from assets
import BackgroundImage from '../asset/i.jpg';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [showLanguageRegion, setShowLanguageRegion] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);

  // Function to navigate to respective screens
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // Function to toggle showing language and region options
  const toggleLanguageRegion = () => {
    setShowLanguageRegion(!showLanguageRegion);
  };

  // Function to toggle showing account management options
  const toggleAccountManagement = () => {
    setShowAccountManagement(!showAccountManagement);
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigateToScreen('ChangePassword')} style={[styles.option, { marginTop: 20 }]}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('TwoFactorAuth')} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Enable Two-Factor Authentication (2FA)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('RecentLoginActivity')} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>View Recent Login Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('ConnectedDevices')} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Manage Connected Devices</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('BillingSubscriptions')} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Billing and Subscriptions</Text>
        </TouchableOpacity>

        {/* Language and Region */}
        <TouchableOpacity onPress={() => toggleLanguageRegion()} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Language and Region</Text>
        </TouchableOpacity>

        {/* Language and Region options */}
        {showLanguageRegion && (
          <View style={styles.languageRegionContainer}>
            <TouchableOpacity onPress={() => navigateToScreen('ChangeLanguage')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Change Language Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('UpdateTimeZone')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Update Time Zone</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('SetRegionalFormats')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Set Regional Formats</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Account Management */}
        <TouchableOpacity onPress={() => toggleAccountManagement()} style={styles.option}>
          <Text style={[styles.optionText, { fontWeight: 'bold' }]}>Account Management</Text>
        </TouchableOpacity>

        {/* Account Management options */}
        {showAccountManagement && (
          <View style={styles.accountManagementContainer}>
            <TouchableOpacity onPress={() => navigateToScreen('DeactivateAccount')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Deactivate Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('DeleteAccount')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('DownloadAccountData')} style={styles.subOption}>
              <Text style={styles.subOptionText}>Download Account Data</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  option: {
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  languageRegionContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  accountManagementContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subOptionText: {
    fontSize: 14,
    color: 'black',
  },
});

export default SettingsScreen;
