import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity, Switch, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../asset/y.jpg';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Login details:', {
      username,
      password,
      rememberMe,
    });

    // Perform your actual login logic here
    // For demonstration, just show login success message
    Alert.alert('Success', 'Login successful');

    // Navigate to HomeScreen inside DrawerNavigator
    navigation.navigate('Drawer', { screen: 'Home', params: { username } });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Implement forgot password functionality');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.signinText}>Let's Sign In!</Text>
        <Text style={styles.subtitle}>Login To Your Account To Continue Your Courses</Text>

        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityIcon}>
            <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#555555" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.rememberMeContainer}>
            <Switch
              value={rememberMe}
              onValueChange={(value) => setRememberMe(value)}
              style={{ marginRight: 10 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.orText}>CONTINUE WITH</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => Alert.alert('Google Login')}>
            <Icon name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Apple Login')}>
            <Icon name="apple" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('LinkedIn Login')}>
            <Icon name="linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Facebook Login')}>
            <Icon name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Organization Login')}>
            <Icon name="building" size={24} color="#FF5733" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
        </View>
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
    alignItems: 'center',
    padding: 16,
  },
  signinText: {
    fontSize: 20,
    marginBottom: 16,
    alignSelf: 'flex-start',
    marginLeft: 16,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    alignSelf: 'flex-start',
    marginLeft: 16,
    color: '#ffffff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    opacity: 0.9,
    color: '#555555',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    opacity: 0.9,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: '#555555',
  },
  passwordVisibilityIcon: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#000000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 12,
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  orText: {
    marginVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

export default LoginScreen;