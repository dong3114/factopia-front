import axios from "axios";

class FCapi {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create: POST 요청
  post(endpoint, data) {
    return this.client.post(endpoint, data);
  }

  // Read: GET 요청
  get(endpoint, params = {}) {
    return this.client.get(endpoint, { params });
  }

  // Update: PUT 요청
  put(endpoint, data) {
    return this.client.put(endpoint, data);
  }

  // Delete: DELETE 요청
  delete(endpoint, params = {}) {
    return this.client.delete(endpoint, { params });
  }

  // Additional: PATCH 요청 (필요 시 확장 가능)
  patch(endpoint, data) {
    return this.client.patch(endpoint, data);
  }
}

export default FCapi;
