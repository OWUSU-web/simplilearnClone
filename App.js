import React, { createContext, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
import ManageDownloadScreen from './screens/ManageDownloadScreen';
import ShareSimplilearnScreen from './screens/ShareSimplilearnScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('CHARLES OWUSU ASARE'); // Example username, replace with actual logic

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

const CustomDrawerContent = (props) => {
  const { username } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    setModalVisible(true);
  };

  const confirmSignOut = () => {
    setModalVisible(false);
    props.navigation.navigate('Login'); // Navigate to Login screen after sign out
  };

  const cancelSignOut = () => {
    setModalVisible(false);
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Profile section */}
      <View style={styles.profileContainer}>
        <Image source={require('./asset/sss.jpg')} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Drawer items */}
      <DrawerItemList {...props} />

      {/* Sign Out button */}
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Sign Out confirmation modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Do you want to Sign Out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmSignOut} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelSignOut} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>The App is created by Group 38</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const { username } = useUser();

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* Drawer screens */}
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ username }}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="home-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="notifications-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Announcements" 
        component={AnnouncementsScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="megaphone-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Manage Downloads" 
        component={ManageDownloadScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="download-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="settings-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Account Settings" 
        component={AccountSettingsScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="person-circle-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Share Simplilearn App" 
        component={ShareSimplilearnScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="share-social-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Privacy Policy" 
        component={PrivacyPolicyScreen} 
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="shield-checkmark-outline" size={size} color={focused ? '#1e90ff' : '#888'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen 
            name="Drawer" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signOutButton: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  signOutText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    minWidth: 70,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default App;
