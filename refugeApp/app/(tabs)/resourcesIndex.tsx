import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from "../utils/style";

interface Resource {
  _id: string;
  nome: string;
  quantidade: number;
  tipo?: string;
}

const API_URL = 'https://api-gestao-abrigo.onrender.com/api/produtos';

export default function ResourcesIndex() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceName, setResourceName] = useState('');
  const [resourceQty, setResourceQty] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    if (!resourceName || !resourceType || isNaN(qty) || qty <= 0) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: resourceName, quantidade: qty, tipo: resourceType }),
      });
      if (res.ok) {
        fetchResources();
        setResourceName('');
        setResourceQty('');
        setResourceType('');
        setModalVisible(false);
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
        Alert.alert('Erro', 'Falha ao excluir o recurso.');
      }
    } catch (error) {
      console.error('Erro ao excluir recurso:', error);
    }
  };

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>📦 Manage Resources</Text>

      <FlatList
        data={resources}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.button, { backgroundColor: '#2D2D44' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Text style={[styles.buttonText, { marginRight: 8 }]}>
                {item.nome} — {item.quantidade}
              </Text>
              {item.tipo && (
                <View style={{
                  backgroundColor: '#3b82f6',
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{item.tipo}</Text>
                </View>
              )}
            </View>

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

      {/* Botão Flutuante “+” */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#3b82f6',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          elevation: 10,
        }}
      >
        <Text style={{ fontSize: 36, color: '#fff' }}>+</Text>
      </TouchableOpacity>

      {/* Modal de Cadastro */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#1e1e2e',
            padding: 20,
            borderRadius: 12,
            width: '90%',
          }}>
            <Text style={styles.title}>Novo Recurso</Text>

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
            <TextInput
              style={styles.input}
              placeholder="Product Type"
              placeholderTextColor="#ccc"
              value={resourceType}
              onChangeText={setResourceType}
            />

            <TouchableOpacity style={styles.button} onPress={addResource}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#555' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
