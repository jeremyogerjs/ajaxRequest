const url = "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees";
const employer = document.querySelector('#employer');
const form = document.querySelector('form');
const allEmploy = [];
const btnCreate = document.querySelector('.create');

btnCreate.addEventListener('click',function(e){
    e.preventDefault();
    form.id = e.target.id;
    form.lastElementChild.name = "submit";
    form.style.opacity = "1";
});

form.addEventListener('submit',function(e){
    e.preventDefault();

    const btnName = e.target[4].name;
    const Mail = e.target[0].value;
    const job = e.target[1].value;
    const name = e.target[2].value;
    const lastName = e.target[3].value;

    if(btnName === "submit"){
        createData(Mail,job,name,lastName);
        form.style.display = 'none';
    }else if( btnName === "edit"){
        editData(e.target.id,Mail,job,name,lastName);  
    }
})
//---------------request for create new userData
function createData(email,job,name,lastName){
    const params = {
        email: email,
        job_title:job,
        last_name:lastName,
        name:name
    }
    let xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function(){
        
        if(this.status === 201 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            alert("Le nouvel employé(e) a bien été ajouté(e)");
            reqData(data);
            form.style.opacity =" 0";
        }else if(this.status === 404 && this.readyState === 4){          
            alert("Une erreur est survenue, veuillez rafraîchir la page")

        }else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti")
        }   
    };
    xhr.open("POST",url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
}

//-----------------------------request to edit userData
function editData(id,email,job,name,lastName){
    const params = {
        email: email,
        job_title:job,
        last_name:lastName,
        name:name
    }
    let urlEdit = url + "/" + id;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        
        if(this.status === 200 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            alert("La modification a bien été pris en compte")
            reqData(data);
            form.style.opacity = "0";
        }else if(this.status === 404 && this.readyState === 4){
            
            alert("Une erreur est survenue, veuillez rafraîchir la page")

        }else if(this.status === 400 && this.readyState === 4){

            alert("Une erreur est survenue,la requête n'a pas abouti")
        }
    };
    xhr.open("PUT",urlEdit);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));

}
/**
 *  
 *         request for delete userData
 *    
*/
 function removeData(elem){
    let urlDel = url + "/" + elem.target.id;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(this.readyState)
        if(this.status === 200 && this.readyState === 4 ){
            alert("L'utilisateur a bien été supprimé");
            elem.target.parentElement.parentElement.remove();
        }else if(this.status === 404 && this.readyState === 4){
            alert("Une erreur est survenue, la page est introuvable")
        }else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti")
        }  
    }
    xhr.open("DELETE",urlDel);
    xhr.send();
}
/**
 * 
 *                              request ajax for all Data
 */
function reqData(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        
        if(this.status === 200 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            showData(data);
        }else if(this.status === 404 && this.readyState === 4){

            alert("Une erreur est survenue, veuillez rafraîchir la page")

        }else if(this.status === 400 && this.readyState === 4){

            alert("Une erreur est survenue,la requête n'a pas abouti")
        }
    }
    xhr.open("GET",url);
    xhr.send();
}
reqData(); 
/**
 * 
 *               Create Article
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
 *               Create All user in HTML
 */
function showData(data){

    employer.innerHTML = '';
    for(let i=0;i< data.length;i++){
        //container
        const article = createElem(null,'article',data[i].id);

        //Data
        const labelEmail =  createElem("Email : ",'span',null);
        const email = createElem(data[i].email,'p',null);
        email.prepend(labelEmail);

        const labelJob = createElem("Job-title : ",'span',null);
        const job = createElem(data[i].job_title,'p',null);
        job.prepend(labelJob);

        const labelLastName = createElem("Last-Name : ",'span',null);
        const lastName = createElem(data[i].last_name,'p',null);
        lastName.prepend(labelLastName);

        const labelName = createElem("NAME : ",'span',null);
        const name = createElem(data[i].name,'p',null);
        name.prepend(labelName);

        //Button
        const btnDelete = createBtn('Delete','Delete',data[i].id);
        const btnEdit = createBtn('Edit',"edit",data[i].id);
        const btnGrp = document.createElement('div');
        btnGrp.appendChild(btnEdit);
        btnGrp.appendChild(btnDelete);

        //Add event for all button
        btnDelete.addEventListener('click',function(e) {
            removeData(e);
        });
        btnEdit.addEventListener('click',function(e){
            form.id = e.target.id;
            form.lastElementChild.name = "edit";
            form.style.opacity = "1"; 
            bg.classList.add("active");          
        });        
        //Data
        article.appendChild(email);
        article.appendChild(job);
        article.appendChild(name);
        article.appendChild(lastName);

        //button
        article.appendChild(btnGrp);
        
        //Data in container
        employer.appendChild(article);
    }
}
