import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../utils/style';

const API_DESABRIGADOS = 'https://api-gestao-abrigo.onrender.com/api/desabrigados';
const API_PRODUTOS = 'https://api-gestao-abrigo.onrender.com/api/produtos';
const API_ALOCADOS = 'https://api-gestao-abrigo.onrender.com/api/produtosAlocados';

export default function RelatorioScreen() {
  const [gerando, setGerando] = useState(false);

  const gerarRelatorio = async () => {
    setGerando(true);
    try {
      const [resDesabrigados, resProdutos, resAlocados] = await Promise.all([
        fetch(API_DESABRIGADOS),
        fetch(API_PRODUTOS),
        fetch(API_ALOCADOS),
      ]);

      const desabrigados = await resDesabrigados.json();
      const produtos = await resProdutos.json();
      const alocados = await resAlocados.json();

      const getNomeProduto = (id) => {
        const prod = produtos.find((p) => p._id === id);
        return prod?.nome || 'Desconhecido';
      };

      const dataAtual = new Date().toLocaleDateString('pt-BR');

      const htmlContent = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
            @page {
                margin: 30px;
            }

            body {
                font-family: Arial, sans-serif;
                padding: 0;
                margin: 0;
                color: #333;
                font-size: 12px;
            }

            .container {
                padding: 30px;
            }

            h1, h2 {
                text-align: center;
                color: #2c3e50;
                margin-bottom: 20px;
            }

            .header, .footer {
                text-align: center;
                color: #777;
                font-size: 12px;
                margin-bottom: 20px;
            }

            .footer {
                margin-top: 40px;
            }

            .line {
                border-top: 1px solid #ccc;
                margin: 10px 0 20px 0;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 40px;
            }

            th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
                vertical-align: top;
            }

            th {
                background-color: #f0f0f0;
            }

            .page-break {
                page-break-before: always;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                <h1>📄 Relatório Institucional do Abrigo</h1>
                <p>Emitido em: ${dataAtual}</p>
                <div class="line"></div>
            </div>

            <h2>🏠 Hóspedes Registrados</h2>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Responsável</th>
                    <th>Itens Alocados</th>
                </tr>
                </thead>
                <tbody>
                ${desabrigados.map((d) => {
                    const itens = alocados
                    .filter((a) => a.idDesabrigado === d._id)
                    .map((a) => `${getNomeProduto(a.idProduto)} — ${a.quantidade}`)
                    .join('<br>');

                    return `
                    <tr>
                        <td>${d.nome}</td>
                        <td>${d.cpf}</td>
                        <td>${d.responsavel || 'N/A'}</td>
                        <td>${itens || '<em>Sem itens</em>'}</td>
                    </tr>
                    `;
                }).join('')}
                </tbody>
            </table>

            <div class="page-break"></div>

            <h2>📦 Recursos Disponíveis</h2>
            <table>
                <thead>
                <tr>
                    <th>Nome do Produto</th>
                    <th>Quantidade em Estoque</th>
                </tr>
                </thead>
                <tbody>
                ${produtos.map((p) => `
                    <tr>
                    <td>${p.nome}</td>
                    <td>${p.quantidade}</td>
                    </tr>
                `).join('')}
                </tbody>
            </table>

            <div class="footer">
                <div class="line"></div>
                <p>Gerado automaticamente pelo Sistema de Gestão de Abrigos</p>
            </div>
            </div>
        </body>
        </html>
        `;



      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      await Sharing.shareAsync(uri);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao gerar o relatório.');
      console.error(err);
    } finally {
      setGerando(false);
    }
  };

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>📊 Gerar Relatório em PDF</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3b82f6' }]}
        onPress={gerarRelatorio}
        disabled={gerando}
      >
        <Text style={styles.buttonText}>
          {gerando ? 'Gerando...' : 'Gerar Relatório'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
