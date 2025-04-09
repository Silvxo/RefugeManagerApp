import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e1e2e',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    scrollContainer: {
      backgroundColor: '#1e1e2e',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    title: {
      fontSize: 28,
      color: '#fff',
      marginBottom: 40,
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#2D2D44',
      color: '#fff',
      width: '100%',
      padding: 12,
      marginBottom: 16,
      borderRadius: 8,
    },
    devComment: {
      color: '#fff',
      fontSize: 14,
      marginBottom: 20,
      textAlign: 'left',
      padding: 10,
      fontStyle: 'italic',
    },
    buttonContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#3b82f6',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 12,
      marginVertical: 10,
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
  });
  