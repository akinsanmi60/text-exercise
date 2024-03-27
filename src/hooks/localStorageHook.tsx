const LOCAL_STORAGE_KEY = {
  TOKEN: 'token',
  USER: 'user',
};

export const pushToLocalStorage = (user?: any) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user));
};
export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
};
export const getToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) as string;
};
