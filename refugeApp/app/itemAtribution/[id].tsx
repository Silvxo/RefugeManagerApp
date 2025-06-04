import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from '../utils/style';

const API_PRODUTOS = 'https://api-gestao-abrigo.onrender.com/api/produtos';
const API_ALOCADOS = 'https://api-gestao-abrigo.onrender.com/api/produtosAlocados';

export default function ItemAtribution() {
  const { id } = useLocalSearchParams();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [alocados, setAlocados] = useState<any[]>([]);
  const [quantidades, setQuantidades] = useState<{ [key: string]: string }>({});
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resProdutos = await fetch(API_PRODUTOS);
      const listaProdutos = await resProdutos.json();

      const resAlocados = await fetch(API_ALOCADOS);
      const listaAlocados = await resAlocados.json();

      const listaAlocadosComNome = listaAlocados
        .filter((a: any) => a.idDesabrigado === id)
        .map((a: any) => {
          const produto = listaProdutos.find((p: any) => p._id === a.idProduto);
          return {
            ...a,
            nome: produto?.nome || 'Produto desconhecido',
          };
        });

      setProdutos(listaProdutos.filter((p: any) => p.quantidade > 0));
      setAlocados(listaAlocadosComNome);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao buscar os dados.');
    }
  };

  const alocarProduto = async (idProduto: string, nome: string) => {
    const quantidade = parseInt(quantidades[idProduto]);
    if (!quantidade || quantidade <= 0) return;

    try {
      const res = await fetch(API_ALOCADOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idDesabrigado: id,
          idProduto,
          quantidade,
        }),
      });

      if (res.ok) {
        Alert.alert('Sucesso', `Produto "${nome}" alocado.`);
        setQuantidades({ ...quantidades, [idProduto]: '' });
        fetchData();
      } else {
        const data = await res.json();
        Alert.alert('Erro', data.message || 'Erro ao alocar recurso.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro de conexão.');
    }
  };

  const removerTotalmente = async (id: string) => {
    try {
      const res = await fetch(`${API_ALOCADOS}/id/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      } else {
        Alert.alert('Erro', 'Falha ao remover item.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão.');
    }
  };

  const removerUmaUnidade = async (item: any) => {
    if (item.quantidade <= 1) {
      return removerTotalmente(item._id);
    }

    try {
      const deleteRes = await fetch(`${API_ALOCADOS}/id/${item._id}`, {
        method: 'DELETE',
      });

      if (!deleteRes.ok) {
        throw new Error('Falha ao deletar item original.');
      }

      const novoItem = {
        idDesabrigado: item.idDesabrigado,
        idProduto: item.idProduto,
        quantidade: item.quantidade - 1,
      };

      const postRes = await fetch(API_ALOCADOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoItem),
      });

      if (postRes.ok) {
        fetchData();
      } else {
        Alert.alert('Erro', 'Falha ao reatribuir item com quantidade reduzida.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro ao tentar remover uma unidade.');
      console.error(err);
    }
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>🧾 Itens Alocados</Text>
      {alocados.length === 0 && (
        <Text style={styles.buttonText}>Nenhum item alocado.</Text>
      )}
      {alocados.map((item, index) => (
        <View key={index} style={[styles.button, { backgroundColor: '#2D2D44' }]}>
          <Text style={styles.buttonText}>{item.nome} — {item.quantidade}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#3b82f6', width: '48%' }]}
              onPress={() => removerUmaUnidade(item)}
            >
              <Text style={styles.buttonText}>-1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#E74C3C', width: '48%' }]}
              onPress={() => removerTotalmente(item._id)}
            >
              <Text style={styles.buttonText}>Remover Tudo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={[styles.title, { marginTop: 20 }]}>📦 Itens Disponíveis</Text>

      <TextInput
        style={[styles.input, { backgroundColor: '#2D2D44', marginBottom: 10 } ]}
        placeholder="🔎 Buscar item"
        placeholderTextColor="#ccc"
        value={busca}
        onChangeText={setBusca}
      />

      {produtosFiltrados.map((item) => (
        <View key={item._id} style={[styles.button, { backgroundColor: '#2D2D44' }]}>
          <Text style={styles.buttonText}>{item.nome} (Estoque: {item.quantidade})</Text>

          <TextInput
            style={[styles.input, { backgroundColor: '#1a1f2e', marginTop: 10 }]}
            placeholder="Quantidade"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={quantidades[item._id] || ''}
            onChangeText={(text) =>
              setQuantidades({ ...quantidades, [item._id]: text })
            }
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#3b82f6' }]}
            onPress={() => alocarProduto(item._id, item.nome)}
          >
            <Text style={styles.buttonText}>Atribuir</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555', marginTop: 20 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
