
import { localHostUserToModel } from "../mappers/localhost-user-mapper";
import {User} from '../models/user'
/**
 * Carga los usuarios por pagina
 * 
 * @param {String|Number} id //Es opcional
 * @returns {Promise<User>}
 */
export const getUserById = async(id = 1)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`
    const res = await fetch(url);
    const data = await res.json();

    const user = localHostUserToModel(data);
    //console.log({user});
    return user;
}