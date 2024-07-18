import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 3000, // Increased duration for slower animation
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 200,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -200,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [slideAnim]);

  const dotOpacity = (inputRange) => slideAnim.interpolate({
    inputRange,
    outputRange: [1, 0, 1],
  });

  const Dot = ({ inputRange }) => (
    <Animated.View style={[styles.dot, { opacity: dotOpacity(inputRange) }]} />
  );

  return (
    <ImageBackground 
      source={require('../asset/r.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image source={require('../asset/Logo.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome to Simpli-learn</Text>
        </View>
        <Animated.View style={[styles.slidingView, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.slidingText}>Your learning journey starts here!</Text>
        </Animated.View>
        <View style={styles.dotsContainer}>
          <Dot inputRange={[-200, -100, 0]} />
          <Dot inputRange={[-100, 0, 100]} />
          <Dot inputRange={[0, 100, 200]} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} color="#1E90FF" />
          </View>
          <View style={styles.button}>
            <Button title="Log In" onPress={() => navigation.navigate('Login')} color="#1E90FF" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    padding: 16,
  },
  header: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  slidingView: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  slidingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E90FF',
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '10%',
  },
  button: {
    width: '40%',
  },
});

export default WelcomeScreen;
