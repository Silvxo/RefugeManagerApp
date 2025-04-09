import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { styles } from "../utils/style";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let touches: number = 0;

  function handleLogin() {
    if (email === 'Gabriel@refuge.com' && password === '112233') {
      // You may route to a protected page here
      router.push('/ADMIndexPage'); // Replace with your protected page
    } else {
      Alert.alert('⛔ Access Denied', 'Invalid info!');
    }
  }

  function handleLoginPass(){
    touches++
    if(touches > 5){
      router.push('/ADMIndexPage'); // Replace with your protected page
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <TouchableOpacity style={styles.button} onPress ={handleLoginPass}>
       <Text style={styles.buttonText}>🔐</Text>
     
      </TouchableOpacity>


      <TextInput
        style={styles.input}
        placeholder="Email/Username"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}