import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { styles } from "../utils/style";

export default function ResourcesIndex() {

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Manage Resources</Text>
    
        <TouchableOpacity style={styles.button} onPress={() => router.push('/resources/addResource')}>
            <Text style={styles.buttonText}>Add Resource</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.button} onPress={() => router.push('/resources/viewResources')}>
            <Text style={styles.buttonText}>View Resources</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.button} onPress={() => router.push('/resources/editResource')}>
            <Text style={styles.buttonText}>Edit Resource</Text>
        </TouchableOpacity>
    
        </View>
    );

}