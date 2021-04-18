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
    };
    let xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function(){
        
        if(this.status === 201 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            alert("Le nouvel employé(e) a bien été ajouté(e)");
            CreateArticle(data); // found in index.js Ligne 138
        }
        else if(this.status === 404 && this.readyState === 4){          
            alert("Une erreur est survenue, veuillez rafraîchir la page et réessayez");
            form.style.pointerEvents = "none";
        }
        else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti, veuillez réessayez");
            form.style.pointerEvents = "none";
        }   
    };
    xhr.open("POST",url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
};
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
    };
    let urlEdit = url + "/" + id;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        
        if(this.status === 200 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            alert("La modification a bien été pris en compte");

            //Update data in API---------------- found in index.js Ligne 102
            editUser(uniqueArt,1,"Name : ",data.name);
            editUser(uniqueArt,2,"Last Name : ",data.last_name);
            editUser(uniqueArt,3,"Job Title : ",data.job_title);
            editUser(uniqueArt,4,"Email : ",data.email);

            //Update data in html
            editUser(editArticle,0,"Name : ",data.name);
            editUser(editArticle,1,"Last Name : ",data.last_name);
        }
        else if(this.status === 404 && this.readyState === 4){
            alert("Une erreur est survenue, veuillez rafraîchir la page");
            form.style.pointerEvents = "none";
        }
        else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti");
            form.style.pointerEvents = "none";
        }
    };
    xhr.open("PUT",urlEdit);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
};

function removeData(elem){
    let urlDel = url + "/" + elem.target.id;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4 ){
            alert("L'utilisateur a bien été supprimé");
            removeUser(elem.target);    // Found in index.js Ligne 119
            resetStyle(elem.target.parentElement);
        }
        else if(this.status === 404 && this.readyState === 4){
            alert("Une erreur est survenue, l'utilisateur est introuvable veuillez rafraichir la page");
        }
        else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti")
        }  
    };
    xhr.open("DELETE",urlDel);
    xhr.send();
};
/**
 * 
 *                              request GET for one Data in API
 */
 function MoreData(elem){
    let urlMore = url + "/" + elem.target.id;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        
        if(this.status === 200 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);

            //Update data in API ------- found in idnex.js Ligne 102
            editUser(uniqueArt,1,"Name : ",data.name);
            editUser(uniqueArt,2,"Last Name : ",data.last_name);
            editUser(uniqueArt,3,"Job Title : ",data.job_title);
            editUser(uniqueArt,4,"Email : ",data.email);
        }
        else if(this.status === 404 && this.readyState === 4){

            alert("Une erreur est survenue, veuillez recharger la page");
        }
        else if(this.status === 400 && this.readyState === 4){

            alert("Une erreur est survenue,la requête n'a pas abouti");
        }
    };
    xhr.open("GET",urlMore);
    xhr.send();
};
/**
 * 
 *                              request GET for all Data in API
 */
function reqData(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        
        if(this.status === 200 && this.readyState === 4 ){
            const data = JSON.parse(xhr.responseText);
            showData(data); // found in index.js Ligne 128
        }
        else if(this.status === 404 && this.readyState === 4){
            alert("Une erreur est survenue, veuillez rafraîchir la page");
        }
        else if(this.status === 400 && this.readyState === 4){
            alert("Une erreur est survenue,la requête n'a pas abouti");
        }
    };
    xhr.open("GET",url);
    xhr.send();
};
reqData(); 