import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from "../utils/style";

interface Resource {
  _id: string;
  nome: string;
  quantidade: number;
}

const API_URL = 'https://api-gestao-abrigo.onrender.com/api/produtos';

export default function ResourcesIndex() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceName, setResourceName] = useState('');
  const [resourceQty, setResourceQty] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Erro ao buscar recursos:', error);
    }
  };

  const addResource = async () => {
    const qty = parseInt(resourceQty);
    if (!resourceName || isNaN(qty) || qty <= 0) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: resourceName, quantidade: qty }),
      });
      if (res.ok) {
        fetchResources();
        setResourceName('');
        setResourceQty('');
      }
    } catch (error) {
      console.error('Erro ao adicionar recurso:', error);
    }
  };

  const updateQuantity = async (item: Resource, delta: number) => {
    const newQuantity = Math.max(item.quantidade + delta, 0);
    try {
      const res = await fetch(`${API_URL}/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: newQuantity }),
      });
      if (res.ok) {
        fetchResources();
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  };

  const confirmDelete = (item: Resource) => {
    Alert.alert(
      'Confirmação de Exclusão',
      `Deseja realmente excluir o recurso "${item.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removeResource(item) },
      ]
    );
  };

  const removeResource = async (item: Resource) => {
    try {
      const res = await fetch(`${API_URL}/${item._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchResources();
      } else {
        Alert.alert('Erro', 'A exclusão não foi implementada no servidor.');
      }
    } catch (error) {
      console.error('Erro ao excluir recurso:', error);
    }
  };

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>📦 Manage Resources</Text>

      <TextInput
        style={styles.input}
        placeholder="Resource Name"
        placeholderTextColor="#ccc"
        value={resourceName}
        onChangeText={setResourceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={resourceQty}
        onChangeText={setResourceQty}
      />

      <TouchableOpacity style={styles.button} onPress={addResource}>
        <Text style={styles.buttonText}>Add Resource</Text>
      </TouchableOpacity>

      <FlatList
        data={resources}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.button, { backgroundColor: '#2D2D44' }]}>
            <Text style={styles.buttonText}>{item.nome} — {item.quantidade}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.button, { width: '30%', backgroundColor: '#3b82f6' }]}
                onPress={() => updateQuantity(item, 1)}
              >
                <Text style={styles.buttonText}>➕</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { width: '30%', backgroundColor: item.quantidade === 0 ? '#555' : '#3b82f6' }
                ]}
                onPress={() => updateQuantity(item, -1)}
                disabled={item.quantidade === 0}
              >
                <Text style={styles.buttonText}>➖</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { width: '30%', backgroundColor: '#E74C3C' }]}
                onPress={() => confirmDelete(item)}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
