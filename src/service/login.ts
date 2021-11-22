import { LoginRequestPayload } from 'src/store/modules/user/model';

export class LoginService {
  static async loginRequest(loginData: LoginRequestPayload) {
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('server error');
      }
      return res.json();
    });

    return result;
  }
}
