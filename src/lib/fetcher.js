//커스텀 진행 예정
import { API_URL, API_KEY } from "@constants/api.js";

// 나중에는 이곳에서 access token 을 발급받아서 자동으로 세팅하는 것도 가능함.
class HTTPClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // URL 생성 헬퍼 메서드
  _buildUrl(endpoint) {
    const url = new URL(endpoint, this.baseUrl);

    // API 키가 있으면 쿼리 파라미터로 추가
    if (this.apiKey) {
      url.searchParams.append("api_key", this.apiKey);
    }

    return url.toString();
  }

  // 공통 fetch 로직
  async _request(endpoint, options = {}) {
    try {
      const url = this._buildUrl(endpoint);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  // GET 요청
  async get(endpoint, options = {}) {
    return this._request(endpoint, {
      method: "GET",
      ...options,
    });
  }

  // POST 요청
  async post(endpoint, body, options = {}) {
    return this._request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  // PUT 요청
  async put(endpoint, body, options = {}) {
    return this._request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  }

  // DELETE 요청
  async delete(endpoint, options = {}) {
    return this._request(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  // PATCH 요청
  async patch(endpoint, body, options = {}) {
    return this._request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    });
  }
}

// 싱글톤 인스턴스 생성
const fetcher = new HTTPClient(API_URL, API_KEY);

export default fetcher;
