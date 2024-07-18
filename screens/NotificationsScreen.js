import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const [isMuted, setIsMuted] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsMuted(previousState => !previousState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isMuted ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isMuted}
          />
        </View>
      ),
    });
  }, [navigation, isMuted, toggleSwitch]);

  return (
    <View style={styles.container}>
      {/* Your screen content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    marginRight: 15, // Adjust as needed for right margin
  },
});

export default NotificationsScreen;
