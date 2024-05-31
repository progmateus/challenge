import axios from 'axios'

const service = axios.create({
  baseURL: 'https://apibgdev.nswebservice.com.br/store/10',
  timeout: 20000
})

export default service
