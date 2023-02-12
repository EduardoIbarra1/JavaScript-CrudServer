import { loadUsersByPage } from "../usecases/load-users-page";


/**
 * Objeto que contiene la pagina y arreglo de usuarios
 */
const state = {
    currentPage: 0,
    users: [],
}




/**
 * Carga la siguiente pagina
 */
const loadNextPage = async()=>{
    //Manda a llamar la peticion de los usuarios
    const users = await loadUsersByPage(state.currentPage + 1)
    if (users.length === 0){
        return;
    } 
    // Se cambia el valor de la pagina
    state.currentPage = state.currentPage + 1; 
    // Se asignan los usuarios
    state.users = users;
}






/**
 * Carga los datos de la pagina
 */
const loadPreviusPage = async() =>{
    //throw new Error('Not implement');
    if(state.currentPage === 1){
        return;
    }
    const users = await loadUsersByPage(state.currentPage - 1)
    if (users.length === 0 ){
        return;
    } 
    // Se cambia el valor de la pagina
    state.currentPage = state.currentPage - 1; 
    // Se asignan los usuarios
    state.users = users;
}




/**
 * 
 * @param {User} user 
 */
const onUserChanged = (updatedUser) =>{
    let wasFound = false;

    state.users = state.users.map(user => {
        if(user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        return user;
    });
    
    if(state.users.length < 10 && !wasFound){
        state.users.push (updatedUser);
    }
}




/**
 * Recargar tabla
 */
const reloadPage = async() =>{
    //Manda a llamar la peticion de los usuarios
    const users = await loadUsersByPage(state.currentPage)
    if (users.length === 0){
        await loadPreviusPage();
        return;
    } 
    // Se asignan los usuarios
    state.users = users;
}






export default{
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,
    
    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}