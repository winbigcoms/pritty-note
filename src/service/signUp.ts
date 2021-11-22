import { SignUpData } from 'src/store/modules/user/model';

export class SignUpService {
  static async signUpRequest(signUpData: SignUpData) {
    const result = await fetch('/api/signUp', {
      method: 'POST',
      body: JSON.stringify(signUpData)
    }).then(res => res.json());

    return result;
  }
}
