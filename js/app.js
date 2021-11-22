showItem();
const addTaskBtn = document.getElementById('addTaskBtn');
const addTaskInput = document.getElementById('addTaskInput');
const saveTaskBtn = document.getElementById('saveTaskBtn');

addTaskBtn.addEventListener('click', function(){
    let inputValue = addTaskInput.value;
    if(inputValue.trim() != 0){
        let storeData = localStorage.getItem('allTasks');
        if(storeData == null){
            tasks = []
        }else{
            tasks = JSON.parse(storeData);
        }
        tasks.push(inputValue);
        localStorage.setItem('allTasks', JSON.stringify(tasks));
        addTaskInput.value = '';
    }
    showItem();
})

function showItem(){
    let storeData = localStorage.getItem('allTasks');
    if(storeData == null){
        tasks = []
    }else{
        tasks = JSON.parse(storeData)
    }
    let html = '';
    let addedTaskList = document.getElementById('addedTaskList');
    tasks.forEach((item, index)=>{
        html += 
            `<tr>
                <th scope="row">${index+1}</th>
                <td>${item}</td>
                <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                <td><button type="button" onclick="deleteTask(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
            </tr>`
    })
    addedTaskList.innerHTML = html;
}

function editTask (index){
    let storeData = localStorage.getItem('allTasks');
    let tasks = JSON.parse(storeData);
    addTaskInput.value = tasks[index];
    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'block';
    let saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;
}

saveTaskBtn.addEventListener('click', function(){
    let storeData = localStorage.getItem('allTasks');
    let tasks = JSON.parse(storeData);
    tasks[saveIndex.value] = addTaskInput.value;
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('allTasks', JSON.stringify(tasks));
    addTaskInput.value = '';
    showItem();
})

function deleteTask(index){
    let storeData = localStorage.getItem('allTasks');
    let tasks = JSON.parse(storeData);
    tasks.splice(index, 1);
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('allTasks', JSON.stringify(tasks));
    addTaskInput.value = '';
    showItem();
}

let deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click', function(){
    let storeData = localStorage.getItem('allTasks');
    let tasks = JSON.parse(storeData);
    if(storeData == null){
        tasks = []
    }else{
        tasks = JSON.parse(storeData);
        tasks = []
    }
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    localStorage.setItem('allTasks', JSON.stringify(tasks));
    addTaskInput.value = '';
    showItem();
})

let searchTextBox = document.getElementById('searchTextBox');
searchTextBox.addEventListener('input', function(){
        let trList = document.querySelectorAll('tr');
    Array.from(trList).forEach(item => {
        let searchText = item.getElementsByTagName('td')[0].innerText;
        let searchValue = searchTextBox.value;
        let text = new RegExp(searchValue, 'gi');
        if(searchText.match(text)){
            item.style.display = 'table-row';
        }else{
            item.style.display = 'none';
        }
    })
})
