import usersStore from '../../store/users-store'
import { deleteUserById } from '../../usecases/delete-user';
import { showModal } from '../render-modal/render-modal';
import './render-table.css'


let table;

const createTable = () =>{
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = 
    `
    
        <tr>
            <th>#Id</th>
            <th>Balance</th>
            <th>Primer nombre</th>
            <th>Ultimo nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
        </tr>
    `
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody)
    return table
}

/**
 * 
 * @param {MauseEvent} event 
 */
const tableSelectListener = (event) =>{
    const element = event.target.closest('.select-user')
    if(!element) return
    const id = element.getAttribute('data-id');
    showModal(id)
 }

 /**
 * 
 * @param {MauseEvent} event 
 */
const tableDeleteListener = async(event) =>{
    const element = event.target.closest('.delete-user')
    if(!element) return
    const id = element.getAttribute('data-id');
    try{
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    }   catch(err){
        console.log(err);
        alert('No se pudo eliminar');
    } 
    
 }

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) =>{

    const users = usersStore.getUsers();

    if(!table){
        table = createTable();
        element.append(table);
        //TODO: Listeners en la tabla
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener)
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += 
        `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
                <a href="#" class="select-user" data-id="${user.id}">Editar</a>
                |
                <a href="#" class="delete-user"data-id="${user.id}">Eliminar</a>
            </td>
        </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML
}