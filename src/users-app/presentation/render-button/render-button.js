import "./render-button.css"
import usersStore  from "../../store/users-store";
import { renderTable } from "../render-table/render-table";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const rendersButton = (element) =>{

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Siguitente pagina'

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Anterior pagina'

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerText = usersStore.getCurrentPage();

    element.append(prevButton, currentPageLabel, nextButton);


    nextButton.addEventListener('click', async()=>{
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });

    prevButton.addEventListener('click', async()=>{
        await usersStore.loadPreviusPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });
}