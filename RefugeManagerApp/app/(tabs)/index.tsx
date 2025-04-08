import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { styles } from "../utils/style";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome Refuge Manager</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.devComment}> V 1.0 </Text>



    </View>
  );
}