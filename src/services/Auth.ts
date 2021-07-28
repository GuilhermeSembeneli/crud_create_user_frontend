export const TOKEN = '@TokenAdvantages';
export const REDUX = 'persist:root';

export const getToken = () => localStorage.getItem(TOKEN);


export const signIn = (token: string) => localStorage.setItem(TOKEN, token)


export const signOut = () =>{
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REDUX);
} 
