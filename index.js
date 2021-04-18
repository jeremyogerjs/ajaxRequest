
const employer = document.querySelector('#employer');

//init variable to stock elem for edit 
let editArticle = null;
//init variable to stock elem for delete 
let delArticle = null;

const form = document.querySelector('form');
const exitForm = form.firstElementChild;

const uniqueArt = document.querySelector('.unique');
const exitArt = uniqueArt.firstElementChild;

const btnDelete = uniqueArt.lastElementChild.previousElementSibling;
const btnEdit = uniqueArt.lastElementChild;

const btnCreate = document.querySelector('.create');
const refresh = document.querySelector('.refresh');

/**
 * 
 * 
 *              Event Button
 * 
 * 
 */
//BTN of navbar "rafraichir"
refresh.addEventListener('click',function(){
    employer.innerHTML = '';
    reqData();
})
//BTN to navbar "CREATE"
btnCreate.addEventListener('click',function(e){
    e.preventDefault();
    resetStyle(uniqueArt);
    form.id = e.target.id;
    form.lastElementChild.name = "submit";
    form.style.right = "calc(50% - 180px)";
    form.style.opacity = "1";
    form.style.pointerEvents = "all";
});

//Event for btn to unique article when click on btnMore 
btnDelete.addEventListener('click',function(e) {
    let delConf = confirm("Etes vous sur de vouloir supprimé ?");
    
    if(delConf){
        removeData(e);
        delArticle.remove();
    }
});
btnEdit.addEventListener('click',function(e){
    form.id = e.target.id;
    form.lastElementChild.name = "Edit";
    form.style.opacity = "1";
    form.style.pointerEvents = "all";  
    form.style.right = "calc(50% - 550px)";     
});
exitArt.addEventListener('click',function(){
    resetStyle(uniqueArt);
})

/**
 * 
 *             Event of formulaire
 * 
 */
//BTN exit "X" to form
exitForm.addEventListener('click',function(){
    
    resetStyle(form);
});

form.addEventListener('submit',function(e){
    e.preventDefault();

    //All input value of form
    const btnName = e.target[4].name;
    const mail = e.target[0].value;
    const job = e.target[1].value;
    const name = e.target[2].value;
    const lastName = e.target[3].value;

    if(btnName === "submit"){
        
        createData(mail,job,name,lastName);     //Send request POST with value of form in params 

        //reset style of form
        resetStyle(form);
    }else if( btnName === "Edit"){
        editData(e.target.id,mail,job,name,lastName);  //Send Request PUT with value of form in params 
        resetStyle(form);
    }
});
/**
 * 
 *  
 *         modify value in HTML of article Editing   
 *  
 */
function editUser(elem,i,text,data){
    const element = elem.children[i].innerText = text + data;
    return element;
};
/**
 * 
 *             Reset Style
 */
 function resetStyle(elem){
    elem.style.opacity = "0";
    elem.style.pointerEvents = 'none';
}
/**
 *  
 *         remove data in uniqueArticle
 *    
*/
function removeUser(elem){
    for(let i = 1; i < elem.parentElement.children.length-2;i++){
        elem.parentElement.children[i].innerText = '';
    }
}
/**
 * 
 *               Create element DOM
 */
function createElem(text,elem,id){
    const element = document.createElement(elem);
    element.innerText = text;
    element.id = id;
    return element;
};
function createBtn(text,name,id){
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
function showData(data){
    for(let i=0;i< data.length;i++){
        CreateArticle(data[i]);
    };
};
/**
 * 
 *               Create all article
 */
function CreateArticle(data){
    
    //container
    const article = createElem(null,'article',data.id);
    //Content Container

    const labelLastName = createElem("Last-Name : ",'span',null);
    const lastName = createElem(data.last_name,'p',null);
    lastName.prepend(labelLastName);

    const labelName = createElem("NAME : ",'span',null);
    const name = createElem(data.name,'p',null);
    name.prepend(labelName);

    //Button
    const btnMore = createBtn('View More','More',data.id);
   
    //event BTN
    btnMore.addEventListener('click',function(e){
        uniqueArt.style.opacity = 1;
        delArticle = e.target.parentElement;
        uniqueArt.id = e.target.id;
        btnDelete.id = e.target.id;
        btnEdit.id = e.target.id;
        uniqueArt.style.pointerEvents = "all";
        editArticle = e.target.parentElement;
        MoreData(e);
    })
    //Data
    article.appendChild(name);
    article.appendChild(lastName); 
    //button
    article.appendChild(btnMore);
    
    //Data in container
    employer.appendChild(article);
    
};
<<<<<<< HEAD
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
=======

>>>>>>> f9c16684cd3bc21587a758249026151de0698168
