import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

export class GithubService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({ baseURL: Config.BASE_URL });
  }

  list = () => {
    return this.client.get('/input');
  };
}
