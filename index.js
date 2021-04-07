const url = "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees";

const employer = document.querySelector('#employer');


//request ajax for all Data
function reqData(){

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){

            const data = JSON.parse(xhr.responseText);
            console.log(data);

            showData(data);
        }
    }
    xhr.open("GET",url);
    xhr.send();
}

function createData(email,lastName,name,job){

    let xhr = new XMLHttpRequest();
    const param = {
        email: email,
        id:employer.children.length+1,
        job_title:job,
        last_name:lastName,
        name:name
    }
    xhr.onreadystatechange = function(){
        
        if(xhr.readyState === 4 && xhr.status === 201){
            const data = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("POST",url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(param));
}

function removeData(target){
    let urlDel = url + "/" + target;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){

            const data = JSON.parse(xhr.responseText);
        }
    }
    xhr.open("DELETE",urlDel);
    xhr.send();
}


function editData(email,lastName,name,job,target){

    let urlEdit = url + "/" + target;

    let xhr = new XMLHttpRequest();
    const param = {
        email: email,
        id:employer.children.length+1,
        job_title:job,
        last_name:lastName,
        name:name
    }
    xhr.onreadystatechange = function(){
        
        if(xhr.readyState === 4 && xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            
        }
    };
    xhr.open("PUT",urlEdit);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(param));

}

//Function for HTML/DOM
function createUser(){
    let email = window.prompt('Entrez son mail : ');

    let lastName = window.prompt('Entrez son nom de famille : ');

    let name = window.prompt('Entrez son prénom : ');

    let job = window.prompt('Entrez son Travail : ');
    createData(email,lastName,name,job);
}

function editUser(e,htmlEmail,htmlLastName,htmlName,htmlJob){
    let email = window.prompt('Entrez le mail pour le modifier : ');
    let lastName = window.prompt('Entrez le nom de famille a modifier : ');
    let name = window.prompt('Entrez le prénom a modifier : ');
    let job = window.prompt('Entrez son Travail : ');

    /*
    htmlEmail.innertext = email;
    htmlLastName.innertext = lastName;
    htmlName.innertext = name;
    htmlJob.innertext = job;
     */
    editData(email,lastName,name,job,e);

}

function deleteUser(e){
    let del = window.prompt('ête vous sur de vouloir faire sa ?');
    console.log(del);
    if(del == ""){
        e.target.parentElement.remove();
        removeData(e.target.id);
    } 
}
function showData(data){

    for(let i=0;i< 10;i++){
        const ul = document.createElement('ul');
        const email = document.createElement('li')
        email.innerText = data[i].email;
       

        const job = document.createElement('li');
        job.innerText = data[i].job_title;
        const lastName = document.createElement('li');
        lastName.innerText = data[i].last_name;
        const name = document.createElement('li');
        name.innerText = data[i].name;

        const btnCreate = document.createElement('button');
        btnCreate.id = data[i].id;
        btnCreate.innerText = 'Create';

        const btnDelete = document.createElement('button');
        btnDelete.id = data[i].id;
        btnDelete.innerText = 'Delete';

        const btnEdit = document.createElement('button');
        btnEdit.id = data[i].id;
        btnEdit.innerText = 'Edit';

        btnDelete.addEventListener('click',function(e) {
            deleteUser(e);
        });
        btnEdit.addEventListener('click',function(e){
            editUser(e.target.id);
        });
        btnCreate.addEventListener('click',function(){
            createUser();
        });

        //Data
        ul.appendChild(email);
        ul.appendChild(job);
        ul.appendChild(name);
        ul.appendChild(lastName);

        //button
        ul.appendChild(btnCreate);
        ul.appendChild(btnEdit);
        ul.appendChild(btnDelete);
        
        employer.appendChild(ul);
    }
}
reqData();