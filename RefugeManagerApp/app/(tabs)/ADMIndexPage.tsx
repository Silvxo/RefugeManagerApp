import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { styles } from "../utils/style";

export default function ADMOptions() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/guestRegistration')}>
        <Text style={styles.buttonText}>Register new guest</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/guestsDataIndex')}>
        <Text style={styles.buttonText}>Guests data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/resourcesIndex')}>
        <Text style={styles.buttonText}>Manage Resources</Text>
      </TouchableOpacity>

    </View>
  );
}
