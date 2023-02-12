import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { rendersButton } from "./presentation/render-button/render-button";
import { hideModal, renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store"
import {saveUser} from "./usecases/save-users"

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UserApp = async (element)=>{
    element.innerHTML = 'Loading...'
    await usersStore.loadNextPage();
    element.innerHTML = ''
    //console.log(usersStore.getUsers());
    renderTable(element);
    rendersButton(element);
    renderAddButton(element)
    renderModal(element, async(userLike)=>{
        const user = await saveUser(userLike);
        usersStore.onUserChanged(user);
        renderTable();
        hideModal();
    });
}