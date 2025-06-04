import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../utils/style';

const API_DESABRIGADO = 'https://api-gestao-abrigo.onrender.com/api/desabrigados';

export default function EditarDesabrigado() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDesabrigado = await fetch(`${API_DESABRIGADO}/${id}`);
        const jsonDesabrigado = await resDesabrigado.json();
        setData(jsonDesabrigado);
      } catch (err) {
        Alert.alert('Erro', 'Falha ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_DESABRIGADO}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        Alert.alert('Sucesso', 'Desabrigado atualizado com sucesso.');
        router.back();
      } else {
        Alert.alert('Erro', 'Falha ao atualizar desabrigado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  if (loading) return <Text style={styles.title}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Editar Desabrigado</Text>

      {Object.entries(data).map(([key, value]) => (
        typeof value === 'string' && key !== '_id' && (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key}
            placeholderTextColor="#ccc"
            value={value}
            onChangeText={text => handleChange(key, text)}
          />
        )
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555' }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
