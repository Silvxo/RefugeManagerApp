import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { styles } from "../utils/style";

interface Resource {
  name: string;
  quantity: number;
}

export default function ResourcesIndex() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceName, setResourceName] = useState('');
  const [resourceQty, setResourceQty] = useState('');

  const addResource = () => {
    const qty = parseInt(resourceQty);
    if (!resourceName || isNaN(qty) || qty <= 0) return;

    const existing = resources.find(item => item.name === resourceName);
    if (existing) {
      existing.quantity += qty;
      setResources([...resources]);
    } else {
      setResources([...resources, { name: resourceName, quantity: qty }]);
    }
    setResourceName('');
    setResourceQty('');
  };

  const updateQuantity = (name: string, delta: number) => {
    setResources(prev => 
      prev.map(item => 
        item.name === name 
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) } 
          : item
      )
    );
  };

  const removeResource = (name: string) => {
    setResources(prev => prev.filter(item => item.name !== name));
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={[styles.button, { backgroundColor: '#2D2D44' }]}>
            <Text style={styles.buttonText}>{item.name} — {item.quantity}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity 
                style={[styles.button, { width: '30%', backgroundColor: '#3b82f6' }]} 
                onPress={() => updateQuantity(item.name, 1)}
              >
                <Text style={styles.buttonText}>➕</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.button, 
                  { 
                    width: '30%', 
                    backgroundColor: item.quantity === 0 ? '#555' : '#3b82f6' 
                  }
                ]} 
                onPress={() => updateQuantity(item.name, -1)} 
                disabled={item.quantity === 0}
              >
                <Text style={styles.buttonText}>➖</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, { width: '30%', backgroundColor: '#E74C3C' }]} 
                onPress={() => removeResource(item.name)}
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
