import axios from 'axios';

export function getCep(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar CEP:', error);
      throw error;
    });
}