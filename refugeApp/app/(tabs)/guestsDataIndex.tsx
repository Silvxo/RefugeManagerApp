import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../utils/style';

interface Guest {
  _id: string;
  nome: string;
  cpf: string;
  responsavel: string;
}

const API_URL = 'https://api-gestao-abrigo.onrender.com/api/desabrigados';

export default function GuestsDataIndex() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filtered, setFiltered] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const simplified = data.map((item: any) => ({
        _id: item._id,
        nome: item.nome,
        cpf: item.cpf,
        responsavel: item.responsavel,
      }));
      setGuests(simplified);
      setFiltered(simplified);
    } catch (error) {
      console.error('Erro ao buscar desabrigados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    const result = guests.filter(
      (g) =>
        g.nome.toLowerCase().includes(lower) ||
        g.cpf.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  const confirmDelete = (item: Guest) => {
    Alert.alert(
      'Confirmação de Exclusão',
      `Deseja realmente excluir o desabrigado "${item.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removeGuest(item),
        },
      ]
    );
  };

  const removeGuest = async (item: Guest) => {
    try {
      const res = await fetch(`${API_URL}/${item._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchGuests();
      } else {
        Alert.alert('Erro', 'Falha ao excluir o desabrigado.');
      }
    } catch (error) {
      console.error('Erro ao excluir desabrigado:', error);
    }
  };

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>Desabrigados Registrados</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome ou CPF"
        placeholderTextColor="#ccc"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[styles.button, { backgroundColor: '#2D2D44' }]}>
              <Text style={styles.buttonText}>Nome: {item.nome}</Text>
              <Text style={styles.buttonText}>CPF: {item.cpf}</Text>
              <Text style={styles.buttonText}>Responsável: {item.responsavel}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, flexWrap: 'wrap' }}>
              <TouchableOpacity
                style={[styles.button, { width: '30%', backgroundColor: '#3b82f6', marginBottom: 8 }]}
                onPress={() => router.push({ pathname: '/(tabs)/[id]', params: { id: item._id } })}
                >
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { width: '30%', backgroundColor: '#E74C3C', marginBottom: 8 }]}
                  onPress={() => confirmDelete(item)}
                >
                  <Text style={styles.buttonText}>🗑️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { width: '30%', backgroundColor: '#10b981', marginTop: 8}]}
                  onPress={() => router.push({ pathname: `/itemAtribution/[id]`, params: { id: item._id } })}
                >
                  <Text style={styles.buttonText}>📦</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
