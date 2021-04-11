
const employer = document.querySelector('#employer');
const form = document.querySelector('form');
let editArticle = null;
const btnCreate = document.querySelector('.create');

btnCreate.addEventListener('click',function(e){
    e.preventDefault();
    form.id = e.target.id;
    form.lastElementChild.name = "submit";
    form.style.opacity = "1";
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
        createData(mail,job,name,lastName);     //Send value of form in params to request
        form.style.display = 'none';
    }else if( btnName === "edit"){
        editData(e.target.id,mail,job,name,lastName);  //Send value of form in params to request
    }
})

/**
 * 
 *  
 *      modify value in HTML of article Editing   
 *  
 */
function editUser(elem,i,text,data){
    const element = elem.children[i].innerText = text + data;
    return element;
}

/**
 * 
 *               Create element
 */
function createElem(text,elem,id){
    const element = document.createElement(elem);
    element.innerText = text;
    element.id = id;
    return element;
}
function createBtn(text,name,id){
    const element = document.createElement('button');
    element.innerText = text;
    element.id = id;
    element.name = name;
    return element;
}
/**
 * 
 *      Function append or prepend elem
 *  
 *  
 */
function prepend(container,contenu){
    const element = container.prepend(contenu);
    return element;
}
function append(container,contenu){
    const element = container.appendChild(contenu);
    return element;
}
/**
 * 
 *               Create All user in HTML
 */
function showData(data){
    for(let i=0;i< data.length;i++){
        CreateArticle(data[i]);
    }
}
/**
 * 
 *               Create unique article
 */

function CreateArticle(data){
    
        //container
        const article = createElem(null,'article',data.id);

        //Contenu Container
        const labelEmail =  createElem("Email : ",'span',null);
        const email = createElem(data.email,'p',null);
        email.prepend(labelEmail);

        const labelJob = createElem("Job-title : ",'span',null);
        const job = createElem(data.job_title,'p',null);
        job.prepend(labelJob);

        const labelLastName = createElem("Last-Name : ",'span',null);
        const lastName = createElem(data.last_name,'p',null);
        lastName.prepend(labelLastName);

        const labelName = createElem("NAME : ",'span',null);
        const name = createElem(data.name,'p',null);
        name.prepend(labelName);

        //Button
        const btnDelete = createBtn('Delete','Delete',data.id);
        const btnEdit = createBtn('Edit',"edit",data.id);
        const btnGrp = document.createElement('div');
        append(btnGrp,btnEdit);
        append(btnGrp,btnDelete);

        //Add event for all button
        btnDelete.addEventListener('click',function(e) {
            removeData(e);
        });
        btnEdit.addEventListener('click',function(e){
            form.id = e.target.id;
            form.lastElementChild.name = "edit";
            form.style.opacity = "1"; 
            editArticle = e.target.parentElement.parentElement;          
        });        
        //Data
        append(article,email);
        append(article,job);
        append(article,name);
        append(article,lastName);

        //button
        append(article,btnGrp);
        
        //Data in container
        append(employer,article);
}