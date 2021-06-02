import axios from 'axios';

export const api_query = axios.create({
  baseURL: 'http://vbg.staffboost.ru/api'
});