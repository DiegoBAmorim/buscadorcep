import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import api from './src/services/api'

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef('')
  const [cepUser, setCepUser] = useState(null)

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep válido');
      setCep('');
      return;
    }
    try{
      const response = await api.get(`/${cep}/json`) 
      setCepUser(response.data)
      Keyboard.dismiss()
    }catch(error){
      console.log('Error:' + error);
    }
    
  }


  function limpar(){
    setCep('')
    inputRef.current.focus();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput 
        style={styles.input}
        placeholder="Ex: 15456000"
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.botao, {backgroundColor: '#1D75CD'}]}
        onPress={buscar}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={[styles.botao, {backgroundColor: '#cd3e1d'} ]}
         onPress={limpar}
         >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser &&
      <View style={styles.resultado}>
      <Text style={styles.itemText}>{cepUser.cep}</Text>
      <Text style={styles.itemText}>{cepUser.logradouro}</Text>
      <Text style={styles.itemText}>{cepUser.bairro}</Text>
      <Text style={styles.itemText}>{cepUser.localidade}</Text>
      <Text style={styles.itemText}>{cepUser.uf}</Text>
    </View>}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText:{
    color: '#fff',
    fontSize: 18
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText:{
    fontSize: 22
  }
});
