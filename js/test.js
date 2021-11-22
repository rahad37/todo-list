showData();
let addTaskInput = document.getElementById('addTaskInput');
let addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', function(){
    let inputValue = addTaskInput.value;
    if(inputValue.trim() != 0){
        let dataStore = localStorage.getItem('addTasks');
    if(dataStore == null){
        task = []
    }else{
        task = JSON.parse(dataStore)
    }
    task.push(inputValue);
    localStorage.setItem('addTasks', JSON.stringify(task));
    addTaskInput.value = '';
    }
    showData();
})


function showData(){
    let dataStore = localStorage.getItem('addTasks');
    if(dataStore == null){
        task = []
    }else{
        task = JSON.parse(dataStore)
    }
    let html = '';
    let addedTaskList = document.getElementById('addedTaskList');
    task.forEach((item, index) => {
        html += 
        `<tr>
            <th scope="row">${index+1}</th>
            <td>${item}</td>
            <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
            <td><button type="button" onclick="deleteItem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
        </tr>`
    })
    addedTaskList.innerHTML = html;
}

function editTask(index){
    let dataStore = localStorage.getItem('addTasks');
    let task = JSON.parse(dataStore);
    addTaskInput.value = task[index];
    let saveTaskBtn = document.getElementById('saveTaskBtn');
    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'block';
    saveTaskBtn.value = index;
}

saveTaskBtn.addEventListener('click', function(){
    let dataStore = localStorage.getItem('addTasks');
    let task = JSON.parse(dataStore);
    task[saveTaskBtn.value] = addTaskInput.value;
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('addTasks', JSON.stringify(task));
    addTaskInput.value = '';
    showData();
})

function deleteItem(index){
    let dataStore = localStorage.getItem('addTasks');
    let task = JSON.parse(dataStore);
    task.splice(index, 1);
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('addTasks', JSON.stringify(task));
    addTaskInput.value = '';
    showData();

}

let deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click', function(){
    let dataStore = localStorage.getItem('addTasks');
    if(dataStore == null){
        task = []
    }else{
        task = JSON.parse(dataStore);
        task= []
    }
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('addTasks', JSON.stringify(task));
    addTaskInput.value = '';
    showData();
})

let searchTextBox = document.getElementById('searchTextBox');
searchTextBox.addEventListener('input', function(){
    let trList = document.querySelectorAll('tr');
    Array.from(trList).forEach(item => {
        let searchText = item.getElementsByTagName('td')[0].innerHTML;
        let searchValue = searchTextBox.value;
        let text = new RegExp(searchValue, 'gi');
        if(searchText.match(text)){
            item.style.display = 'table-row';
        }else{
            item.style.display = 'none';
        }
    })
})