import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from "../utils/style";

export default function ADMOptions() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/guestRegistration')}>
        <Text style={styles.buttonText}> 📝 Registrar novo hóspede 📝</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/guestsDataIndex')}>
        <Text style={styles.buttonText}> 👥 Dados dos hóspedes 👥</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/resourcesIndex')}>
        <Text style={styles.buttonText}>📦 Gerenciar recursos 📦</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/relatorio')}>
        <Text style={styles.buttonText}>📄 Gerar relatório 📄</Text>
      </TouchableOpacity>

    </View>
  );
}
