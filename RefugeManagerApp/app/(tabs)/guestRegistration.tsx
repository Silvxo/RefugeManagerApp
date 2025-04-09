import React, { useState } from 'react';
import { ScrollView, TextInput, StyleSheet, View, Button, Alert } from 'react-native';
import { styles } from '../utils/style'; 

export default function FormularioAbrigo() {
    const [form, setForm] = useState({
        nomeCompleto: '',
        idade: '',
        sexo: '',
        dependentes: '',
        cpf: '',
        nacionalidade: '',
        nomeMae: '',
        estadoCivil: '',
        motivoDesabrigo: '',
        contatoEmergencia: '',
        restricaoAlimentar: '',
        usoMedicamento: '',
        necessidadeEspecial: '',
        condicaoEspecial: '',
        dataEntrada: '',
        localizacaoAbrigo: '',
        tempoRua: '',
        recebeBeneficio: '',
        itensPessoais: '',
        responsavel: '',
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
    const payload = {
        nome: form.nomeCompleto,
        idade: Number(form.idade),
        sexo: form.sexo,
        dependentes: form.dependentes,
        cpf: form.cpf,
        nacionalidade: form.nacionalidade,
        nomeDaMae: form.nomeMae,
        estadoCivil: form.estadoCivil,
        motivoSituacaoDesabrigo: form.motivoDesabrigo,
        contato: form.contatoEmergencia,
        restricaoAlimentar: form.restricaoAlimentar,
        medicamentoContinuo: form.usoMedicamento,
        necessidadeEspecial: form.necessidadeEspecial,
        condicaoEspecial: form.condicaoEspecial,
        dataEntrada: new Date(form.dataEntrada),
        localizacao: form.localizacaoAbrigo,
        tempoEmSituacaoDeRua: form.tempoRua,
        recebeBeneficioGOV: form.recebeBeneficio,
        itensPessoais: form.itensPessoais,
        responsavel: form.responsavel
    };

    try {
        const response = await fetch('http://<IP_DA_API>:3000/api/desabrigados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            Alert.alert("Sucesso", "Desabrigado cadastrado com sucesso!");
            setForm({ ...form, nomeCompleto: '' }); // exemplo de reset parcial
        } else {
            const errorData = await response.json();
            Alert.alert("Erro", errorData.message || "Erro ao cadastrar");
        }
    } catch (error) {
        Alert.alert("Erro de conexão", "Verifique sua conexão com a internet e tente novamente.");
    }
};

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TextInput placeholder="Nome Completo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('nomeCompleto', text)} value={form.nomeCompleto} />
            <TextInput placeholder="Idade" style={styles.input} placeholderTextColor="#aaa" keyboardType="numeric" onChangeText={text => handleChange('idade', text)} value={form.idade} />
            <TextInput placeholder="Sexo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('sexo', text)} value={form.sexo} />
            <TextInput placeholder="Dependentes" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('dependentes', text)} value={form.dependentes} />
            <TextInput placeholder="CPF" style={styles.input} placeholderTextColor="#aaa" keyboardType="numeric" onChangeText={text => handleChange('cpf', text)} value={form.cpf} />
            <TextInput placeholder="Nacionalidade" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('nacionalidade', text)} value={form.nacionalidade} />
            <TextInput placeholder="Nome da mãe" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('nomeMae', text)} value={form.nomeMae} />
            <TextInput placeholder="Estado civil" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('estadoCivil', text)} value={form.estadoCivil} />
            <TextInput placeholder="Motivo da situação de desabrigo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('motivoDesabrigo', text)} value={form.motivoDesabrigo} />
            <TextInput placeholder="Contato de Emergência ou telefone" style={styles.input} placeholderTextColor="#aaa" keyboardType="phone-pad" onChangeText={text => handleChange('contatoEmergencia', text)} value={form.contatoEmergencia} />
            <TextInput placeholder="Restrição alimentar" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('restricaoAlimentar', text)} value={form.restricaoAlimentar} />
            <TextInput placeholder="Uso de medicamento contínuo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('usoMedicamento', text)} value={form.usoMedicamento} />
            <TextInput placeholder="Necessidade especial" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('necessidadeEspecial', text)} value={form.necessidadeEspecial} />
            <TextInput placeholder="Condição especial (cego, surdo, etc)" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('condicaoEspecial', text)} value={form.condicaoEspecial} />
            <TextInput placeholder="Data de entrada no abrigo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('dataEntrada', text)} value={form.dataEntrada} />
            <TextInput placeholder="Localização dentro do abrigo" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('localizacaoAbrigo', text)} value={form.localizacaoAbrigo} />
            <TextInput placeholder="Tempo em situação de rua" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('tempoRua', text)} value={form.tempoRua} />
            <TextInput placeholder="Recebe algum benefício do GOV?" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('recebeBeneficio', text)} value={form.recebeBeneficio} />
            <TextInput placeholder="Itens pessoais" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('itensPessoais', text)} value={form.itensPessoais} />
            <TextInput placeholder="Responsável pelo alojado" style={styles.input} placeholderTextColor="#aaa" onChangeText={text => handleChange('responsavel', text)} value={form.responsavel} />

            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}



