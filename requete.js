const url = "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees";

/**
 * 
 *  
 *                       request for create new userData
 * 
 * 
 */
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
            CreateArticle(data)
            form.style.opacity =" 0";
        }else if(this.status === 404 && this.readyState === 4){          
            alert("Une erreur est survenue, veuillez rafraîchir la page");
            
        }else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti");
        }   
    };
    xhr.open("POST",url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
}

/**
 * 
 *                             request to edit userData 
 * 
*/
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
            alert("La modification a bien été pris en compte");
            form.style.opacity = "0";
            editUser(editArticle,0,"Email : ",data.email);
            editUser(editArticle,1,"Job-title : : ",data.job_title);
            editUser(editArticle,2,"NAME : ",data.name);
            editUser(editArticle,3,"Last-Name : ",data.last_name);

        }else if(this.status === 404 && this.readyState === 4){
            alert("Une erreur est survenue, veuillez rafraîchir la page");

        }else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti");
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