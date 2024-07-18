import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthSession } from 'expo';
import { Ionicons, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the dropdown picker

// Import your background image
import backgroundImage from '../asset/ml.jpg'; // Adjust the path and file extension according to your asset

// Define country flags or emojis
const countryFlags = {
  USA: '🇺🇸',
  Canada: '🇨🇦',
  UK: '🇬🇧',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  France: '🇫🇷',
  Japan: '🇯🇵',
  'South Korea': '🇰🇷',
  China: '🇨🇳',
  Ghana: '🇬🇭',
  Mali: '🇲�',
  Togo: '🇹🇬',
  India: '🇮🇳',
  Brazil: '🇧🇷',
  Russia: '🇷🇺',
  Italy: '🇮🇹',
  Spain: '🇪�',
  Mexico: '🇲🇽',
  Argentina: '🇦🇷',
  Nigeria: '🇳🇬',
  Egypt: '🇪🇬',
  'South Africa': '🇿🇦',
  // Add more countries and their flags here
};

const countries = [
  { label: 'Select Country', value: '' },
  { label: `USA ${countryFlags.USA}`, value: 'USA' },
  { label: `Canada ${countryFlags.Canada}`, value: 'Canada' },
  { label: `UK ${countryFlags.UK}`, value: 'UK' },
  { label: `Australia ${countryFlags.Australia}`, value: 'Australia' },
  { label: `Germany ${countryFlags.Germany}`, value: 'Germany' },
  { label: `France ${countryFlags.France}`, value: 'France' },
  { label: `Japan ${countryFlags.Japan}`, value: 'Japan' },
  { label: `South Korea ${countryFlags['South Korea']}`, value: 'South Korea' },
  { label: `China ${countryFlags.China}`, value: 'China' },
  { label: `Ghana ${countryFlags.Ghana}`, value: 'Ghana' },
  { label: `Mali ${countryFlags.Mali}`, value: 'Mali' },
  { label: `Togo ${countryFlags.Togo}`, value: 'Togo' },
  { label: `India ${countryFlags.India}`, value: 'India' },
  { label: `Brazil ${countryFlags.Brazil}`, value: 'Brazil' },
  { label: `Russia ${countryFlags.Russia}`, value: 'Russia' },
  { label: `Italy ${countryFlags.Italy}`, value: 'Italy' },
  { label: `Spain ${countryFlags.Spain}`, value: 'Spain' },
  { label: `Mexico ${countryFlags.Mexico}`, value: 'Mexico' },
  { label: `Argentina ${countryFlags.Argentina}`, value: 'Argentina' },
  { label: `Nigeria ${countryFlags.Nigeria}`, value: 'Nigeria' },
  { label: `Egypt ${countryFlags.Egypt}`, value: 'Egypt' },
  { label: `South Africa ${countryFlags['South Africa']}`, value: 'South Africa' },
  // Add more countries here as needed
];

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState(false); // State to control the dropdown

  const handleSignup = () => {
    if (
      firstName === '' ||
      username === '' ||
      dateOfBirth === '' ||
      email === '' ||
      country === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    console.log('Signup details:', {
      firstName,
      username,
      dateOfBirth,
      email,
      country,
      password,
    });

    Alert.alert('Success', 'Signup successful');
    navigation.navigate('Welcome');
  };

  const handleSignupWithGoogle = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=token&scope=openid%20profile%20email`,
    });

    console.log(result);
  };

  const handleSignupWithApple = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl: `https://appleid.apple.com/auth/authorize?response_type=code&scope=email%20name&response_mode=form_post&client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    console.log(result);
  };

  const handleSignupWithFacebook = () => {
    Alert.alert('Info', 'Signup with Facebook is not implemented yet.');
  };

  const handleSignupWithLinkedIn = () => {
    Alert.alert('Info', 'Signup with LinkedIn is not implemented yet.');
  };

  const handleSignupWithOrganization = () => {
    Alert.alert('Info', 'Signup with Organization is not implemented yet.');
  };

  const handleTermsPress = () => {
    Alert.alert(
      'Terms and Conditions',
      'These are the terms and conditions of using our app. Please read them carefully.'
    );
  };

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to your Login screen
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={countries}
            value={country}
            setValue={setCountry}
            searchable={true}
            placeholder="Select Country"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownStyle={styles.dropdownStyle}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={styles.checkbox}
          >
            {termsAccepted && <FontAwesome name="check" size={20} color="black" />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            <Text style={styles.linkText} onPress={handleTermsPress}>
              I accept the{' '}
              <Text style={styles.linkText} onPress={handleTermsPress}>
                terms and conditions
              </Text>
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signupOptions}>
          <TouchableOpacity style={styles.optionButton} onPress={handleSignupWithGoogle}>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleSignupWithApple}>
            <FontAwesome5 name="apple" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleSignupWithFacebook}>
            <FontAwesome name="facebook" size={24} color="#3B5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleSignupWithLinkedIn}>
            <FontAwesome name="linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleSignupWithOrganization}>
            <AntDesign name="team" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginLink} onPress={handleLoginPress}>
          <Text style={[styles.loginText, { fontWeight: 'bold' }]}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: 'black',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signupOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  optionButton: {
    marginHorizontal: 10,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
