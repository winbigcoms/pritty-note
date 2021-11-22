export interface LoginRequestPayload {
  id: string;
  pw: string;
}

export interface LoginSuccessReturn {
  id: string;
  name: string;
}

export interface LoginReturn {
  result: boolean;
  data: LoginSuccessReturn;
}

export interface LoginFailReturn {
  error: string;
}

export interface LoginData {
  id: string;
  name: string;
  loading: boolean;
  error: string;
}

export interface SignUpData {
  loginID: string;
  loginPW: string;
  loginName: string;
}
