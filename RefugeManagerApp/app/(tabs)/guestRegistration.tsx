import React, { useState } from 'react';
import { ScrollView, TextInput, StyleSheet, View, Button, Alert } from 'react-native';

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

    const handleSubmit = () => {
        Alert.alert("Dados salvos", JSON.stringify(form, null, 2));
        // Aqui você pode enviar os dados para uma API, salvar localmente, etc.
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        color: '#000',
    },
    buttonContainer: {
        marginTop: 20,
    }
});
