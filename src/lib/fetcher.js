//커스텀 진행 예정
import { API_KEY, API_URL } from '@constants/api.js';
import axios from 'axios';

class HTTPClient {
  constructor(baseUrl, apiKey) {
    // axios 인스턴스 생성
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000, // 10초 타임아웃
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiKey = apiKey;

    // Request - 모든 요청에 API 키 자동 추가
    this.client.interceptors.request.use(
      (config) => {
        if (this.apiKey) {
          config.params = {
            ...config.params,
            api_key: this.apiKey,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response - 에러 처리
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // 서버가 2xx 외의 상태 코드 응답
          throw new Error(
            `HTTP Error: ${error.response.status} ${error.response.statusText}`,
            { cause: error.response.data },
          );
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못함
          throw new Error('Network Error: 네트워크 연결을 확인해주세요', {
            cause: error,
          });
        } else {
          // 요청 설정 중 에러
          throw new Error('Request Error: 요청 중 오류가 발생했습니다', {
            cause: error,
          });
        }
      },
    );
  }

  // GET 요청
  async get(endpoint, params = {}, options = {}) {
    const response = await this.client.get(endpoint, {
      params,
      ...options,
    });
    return response.data;
  }
  /*
  // POST 요청
  async post(endpoint, body = {}, options = {}) {
    const response = await this.client.post(endpoint, body, options);
    return response.data;
  }

  // PUT 요청
  async put(endpoint, body = {}, options = {}) {
    const response = await this.client.put(endpoint, body, options);
    return response.data;
  }

  // DELETE 요청
  async delete(endpoint, options = {}) {
    const response = await this.client.delete(endpoint, options);
    return response.data;
  }

  // PATCH 요청
  async patch(endpoint, body = {}, options = {}) {
    const response = await this.client.patch(endpoint, body, options);
    return response.data;
  }
    */
}

// 싱글톤 인스턴스 생성
const fetcher = new HTTPClient(API_URL, API_KEY);

export default fetcher;
