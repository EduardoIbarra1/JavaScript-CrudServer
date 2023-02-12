import { localHostUserToModel } from "../mappers/localhost-user-mapper";
import { userModelLocalHost } from "../mappers/user-localhost-mapper";
import {User} from '../models/user'
import { hideModal, renderModal } from "../presentation/render-modal/render-modal";


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser= async(userLike)=>{ 
    const user = new User(userLike);

    if( !user.firstName || !user.lastName )
        throw new Error('Primer y ultimo nombres son requeridos')
    const userToSave = userModelLocalHost(user);
    let userUpdated;
    if(user.id){
        userUpdated = await updateUser(userToSave);
    }else{
        userUpdated = await createUser(userToSave);
    }
    return localHostUserToModel(userUpdated)
}

/**
 * @param {Like<User>} user
 */
const createUser= async(user)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
       method: 'POST',
       body: JSON.stringify(user),
       headers: {
        'Content-Type': 'application/json'
       } 
    })
    const newUser = await res.json();
    //console.log(newUser);
    return newUser;
}


/**
 * @param {Like<User>} user
 */
const updateUser= async(user)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
       method: 'PATCH',
       body: JSON.stringify(user),
       headers: {
        'Content-Type': 'application/json'
       } 
    })
    const updateUser = await res.json();
    //console.log(newUser);
    return updateUser;
}