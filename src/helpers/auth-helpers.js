//função para receber os dados de autenticação do usuário
//e gravalos em um LOCAL STORAGE

export const signIn = (data) => {
    //gravar as informações do usuário autenticado
    localStorage.setItem('USER_AUTH', JSON.stringify(data));

}