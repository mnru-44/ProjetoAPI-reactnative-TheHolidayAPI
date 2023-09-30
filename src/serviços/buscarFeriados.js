import axios from 'axios';

export async function buscarFeriados(ano, pais) {
    const API_URL = `https://date.nager.at/api/v3/PublicHolidays/${ano}/${pais}`;
    try {
        const response = await axios.get(`${API_URL}`);
        return(response.data);
    } 
    catch (error) {
        console.error('Erro ao buscar feriados:', error);
        return('')
    }
}