import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { buscarFeriados } from '../serviços/buscarFeriados.js';

const Item = ({title, date}) => (
	<View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ADD8E6",
        flexGrow: 1,
        margin: 2,
        padding: 10
    }}>
        <Text style={{
            borderColor: 'black', // Cor da borda
            borderWidth: 1, // Largura da borda
            padding: 5,
            marginRight: 10,
            borderRadius: 10,
            fontWeight: 'bold'
        }}>{date}</Text>
		<Text style={{
            fontSize: 16
        }}>{title}</Text>
	</View>
);

export function Base() {
	const [ano, setAno] = useState('2023');
	const [feriados, setFeriados] = useState([]);
	const [pais, setPais] = useState('BR')

    async function buscar() {
        try {
            const response = await buscarFeriados(ano, pais)
            setFeriados(response)        
        }
        catch(erro) {
            console.log("Erro:", erro)
        }
    }

    const feriadosvar = feriados.reduce((i, feriado) => {
        i[feriado.date] = { selected: true, disableTouchEvent: true, selectedColor: '#5E60CE', };
        return i;
      }, {});

	return (
		<ScrollView style={{ backgroundColor: '#141414' }}>
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Dupla: Carlos Emanuel e Maria Laylla | Turma 513</Text>
                <Text style={{ fontSize: 35, marginBottom: 10, color: 'white' }}>Feriados em 2023:</Text>
                <TextInput 
                    placeholder="Ano"
                    value={ano}
                    onChangeText={(text) => setAno(text)}
                    style={{ borderColor: 'white', color: 'white', fontSize: 20, borderWidth: 1, padding: 5, marginBottom: 10 }}
                />
                <TextInput 
                    placeholder="País"
                    value={pais}
                    onChangeText={(text) => setPais(text)}
                    style={{ borderColor: 'white', color: 'white', fontSize: 20, borderWidth: 1, padding: 5, marginBottom: 10 }}
                />
                <TouchableOpacity
                    style={{
                        marginBottom: 10,
                        backgroundColor: '#ADD8E6',
                        padding: 10,
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                    onPress={buscar}
                >
                    <Text style={{ color: '#141414', fontSize: 20, fontWeight: 400 }}>Buscar Feriados</Text>
                </TouchableOpacity>
                <Calendar
                    style={{
                        borderWidth: 1,
                        borderColor: '#141414',
                        borderRadius: 10,
                        marginBottom: 10,
                        height: 380
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                    }}
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    
                    markedDates={feriadosvar}
                />
                <FlatList
                    style={{
                        borderWidth: 1,
                        borderColor: '#141414',
                        height: 350,
                    }}
                    data={feriados}
                    renderItem={({item}) => <Item title={item.localName} date={item.date}/>}
                    key={item => item.id}
                />
            </View>
		</ScrollView>
	);
}