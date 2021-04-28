//container of all article
const employer = document.querySelector('#employer');

//init variable to stock elem for edit 
let editArticle = null;
//init variable to stock elem for delete 
let delArticle = null;

const form = document.querySelector('form');
const uniqueArt = document.querySelector('.unique');
//btn to exitModal
const exitModal = document.querySelectorAll('.delete');
//Btn of article in section
const btnDelete = uniqueArt.lastElementChild.firstElementChild;
const btnEdit = btnDelete.nextElementSibling;
//Btn of NavBar
const btnCreate = document.querySelector('.create');
const refresh = document.querySelector('.refresh');

//background when modal is open
const bgModal = document.querySelectorAll('.modal-background');
/**
 * 
 * 
 *              Event Button
 * 
 * 
 */
//BTN of navbar "rafraichir"
refresh.addEventListener('click',function()
{
    employer.innerHTML = '';
    reqData();
});
//BTN to navbar "CREATE"
btnCreate.addEventListener('click',function(e)
{
    e.preventDefault();
    form.id = e.target.id;
    form.lastElementChild.name = "submit";
    form.parentElement.classList.toggle('is-active'); 
});
//Event for btn to unique article when click on btnMore 
btnDelete.addEventListener('click',function(e) 
{
    let delConf = confirm("Etes vous sur de vouloir supprimé ?");
    if(delConf)
    {
        removeData(e);
        delArticle.remove();
    };
});
btnEdit.addEventListener('click',function(e)
{
    form.id = e.target.id;
    form.lastElementChild.lastElementChild.firstElementChild.name = "Edit";
    form.parentElement.classList.toggle('is-active');  
});

/**
 * 
 *                      Event for closing Modals
 * 
 */

//add event to close modal for unique art and form.
exitModal[1].addEventListener('click',function()
{
    uniqueArt.parentElement.classList.remove('is-active');
}); 
exitModal[0].addEventListener('click',function()
{
    form.parentElement.classList.remove('is-active');
});
//Close modal form or uniqueArt onclick on bg
for(let i=0;i<bgModal.length;i++)   //bgmodal === nodelist (class) 
{
    bgModal[i].addEventListener('click',()=>
    {
        bgModal[i].parentElement.classList.remove('is-active');
    });
};
/**
 * 
 *             Event of formulaire
 * 
 */
form.addEventListener('submit',function(e)
{
    e.preventDefault();
    //All input value of form
    const btnName = e.target[5].name;
    const mail = e.target[1].value;
    const job = e.target[2].value;
    const name = e.target[3].value;
    const lastName = e.target[4].value;

    if(btnName === "submit")
    {
        createData(mail,job,name,lastName);     //Send request POST with value of form in args 
    }
    else if( btnName === "Edit")
    {
        editData(e.target.id,mail,job,name,lastName);  //Send Request PUT with value of form in args    
    };
});
/**
 * 
 *  
 *         modify value in HTML of article Editing   
 *  
 */
function editUser(elem,i,text,data)
{
    const element = elem.children[i].innerText = text + data;
    return element;
};
/**
 *  
 *         remove data in uniqueArticle
 *    
*/
function removeUser(elem)
{
    for(let i = 1; i < elem.parentElement.children.length-2;i++)
    {
        elem.parentElement.children[i].innerText = '';
    };
};
/**
 * 
 *               Create element DOM
 */
function createElem(text,elem,id)
{
    const element = document.createElement(elem);
    element.innerText = text;
    element.id = id;
    return element;
};
function createBtn(text,name,id)
{
    const element = document.createElement('button');
    element.innerText = text;
    element.id = id;
    element.name = name;
    return element;
};
/**
 * 
 *               Create All user in HTML
 */
function showData(data)
{
    for(let i=0;i< data.length;i++){
        CreateArticle(data[i]);
    };
};
/**
 * 
 *               Create all article
 */
function CreateArticle(data)
{
    //container
    const article = createElem(null,'article',data.id);
    article.className = 'card column is-one-quarter';   

    //Content Container
    const labelLastName = createElem("Last-Name : ",'span',null);
    const lastName = createElem(data.last_name,'p',null);
    lastName.prepend(labelLastName);

    const labelName = createElem("NAME : ",'span',null);
    const name = createElem(data.name,'p',null);
    name.prepend(labelName);

    //Button
    const btnMore = createBtn('View More','More',data.id);
    btnMore.className = 'button is-info'
    //event BTN
    btnMore.addEventListener('click',function(e)
    {
        uniqueArt.parentElement.classList.toggle('is-active');
        delArticle = e.target.parentElement;
        uniqueArt.id = e.target.id;
        btnDelete.id = e.target.id;
        btnEdit.id = e.target.id;
        editArticle = e.target.parentElement;
        MoreData(e);
    });
    //Data
    article.appendChild(name);
    article.appendChild(lastName); 
    //button
    article.appendChild(btnMore);
    //Data in container
    employer.appendChild(article);
    
};
/**
 * 
 *               Create unique article
 */

function CreateUniqueArticle(data){
    CreateArticle(data)

    const btnDelete = createBtn('Delete','Delete',data.id);
    const btnEdit = createBtn('Edit',"edit",data.id);

    const btnGrp = createElem(null,'div',null); 
    btnGrp.appendChild(btnEdit);
    btnGrp.appendChild(btnMore);
    btnGrp.appendChild(btnDelete);

    //Add event for all button
    btnDelete.addEventListener('click',function(e) {
        let delConf = confirm("Etes vous sur de vouloir supprimé ?");
        if(delConf){
            removeData(e);
        }
    });
    btnEdit.addEventListener('click',function(e){
        form.id = e.target.id;
        form.lastElementChild.name = "edit";
        form.style.opacity = "1";
        form.style.pointerEvents = "all";
        editArticle = e.target.parentElement.parentElement;          
    });
    
    btnMore.addEventListener('click',function(e){
        MoreData(e);
    });
}
