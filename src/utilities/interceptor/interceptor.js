export class Interceptor {
  static token = null;

  static setToken(token) {
    this.token = token;
  }

  static getToken() {
    return this.token;
  }
}
