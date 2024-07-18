// Path: ./screens/ShareSimplilearnScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

const ShareSimplilearnScreen = () => {
  useEffect(() => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'Check out the Simplilearn app! It\'s an amazing platform for learning.',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type of result.activityType
          } else {
            // Shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    // Call onShare when the component mounts
    onShare();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sharing Simplilearn App...</Text>
      {/* You can optionally show a loading indicator or message while sharing */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ShareSimplilearnScreen;
