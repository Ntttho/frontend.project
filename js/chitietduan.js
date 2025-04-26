// du lieu aan dau cho chi tiet du an
let tasks = JSON.parse(sessionStorage.getItem("taskList"));
// console.log(tasks);
// lấy ra index trong ds project để có thể dể thao tác 
let indexOfProject = JSON.parse(sessionStorage.getItem("indexOfProject"))
// lấy ra ds project để có thể lưu lại bất kỳ sự thay đổi nào
let projectList = JSON.parse(localStorage.getItem("project"))
// lấy ra ds thành viên đăng kì để dể dàng truy suất thông tin (tên: người phụ trách nhiệm vụ, email: nhăm thêm thành viên vào nhiệm vụ)
// console.log(indexOfProject);
// console.log(projectList);
// lấy ra các tài khoản có trong account => nhầm mục đích tìm id và ghi gmail
let account = JSON.parse(localStorage.getItem("account"))
// console.log(account);


// lấy ra nút xác nhận xóa html


function showListTask (tasks){
    let todo = document.getElementById("todo")
    let inProgress = document.getElementById("inProgress")
    let pending = document.getElementById("pending")
    let done = document.getElementById("done")

todo.innerHTML = `<tr>
                        <th class="" colspan="12"><button class="btn"> <span>></span><b> To Do</b></button></th>
                    </tr>`
inProgress.innerHTML = `<tr>
                        <th colspan="12"><button class="btn"><span>></span> <b>In Progress</b></button> </th>
                    </tr>`
pending.innerHTML = `<tr>
                        <th colspan="12"><button class="btn"><span>></span> <b>Pending</b></button></th>
                    </tr>`
done.innerHTML = `<tr>
                        <th colspan="12"><button class="btn"><span>></span> <b>Done</b></button></th>
                    </tr>`



tasks.forEach((element, index) =>{
    
    // lấy ra tên người phụ trách
    
    let assigneeName = ""
    for(let e of account){
        if(element.assigneeId == e.id){
            assigneeName = e.name;
            // console.log("hela");
            break
        }
    }
    let startDate = new Date(element.assignDate)
    // console.log(startDate);
    let endDate = new Date(element.dueDate)
    // console.log(endDate);
    
    if(element.status == "To do"){
        todo.innerHTML += `<tr>
                        <td>${element.taskName}</td>
                        <td class="text-center">${assigneeName}</td>
                        <td class="text-center">
                            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
                        </td>
                        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
                        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
                        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
                        <td class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
                            <button onclick="deleteTask(${element.taskId})" class="btn btn-danger" type="button" data-bs-toggle="modal"
                                data-bs-target="#modalDelete">Xóa</button>
                        </td>
                    </tr>`
    }else if(element.status == "In Progress"){
        todo.innerHTML += `<tr>
        <td>${element.taskName}</td>
        <td class="text-center">${assigneeName}</td>
        <td class="text-center">
            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
        </td>
        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
        <td class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
            <button class="btn btn-danger" type="button" data-bs-toggle="modal"
                data-bs-target="#modalDelete">Xóa</button>
        </td>
    </tr>`
    }else if(element.status == "Pending"){
        todo.innerHTML += `<tr>
        <td>${element.taskName}</td>
        <td class="text-center">${assigneeName}</td>
        <td class="text-center">
            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
        </td>
        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
        <td class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
            <button class="btn btn-danger" type="button" data-bs-toggle="modal"
                data-bs-target="#modalDelete">Xóa</button>
        </td>
    </tr>`
    }else if(element.status == "Done"){
        todo.innerHTML += `<tr>
        <td>${element.taskName}</td>
        <td class="text-center">${assigneeName}</td>
        <td class="text-center">
            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
        </td>
        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
        <td class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
            <button onclick="deleteTask(${element.taskId})" class="btn btn-danger" type="button" data-bs-toggle="modal"
                data-bs-target="#modalDelete">Xóa</button>
        </td>
    </tr>`
    }

})

}
showListTask(tasks)

// tasks.filter
function deleteTask (id){
    let btnDelete = document.getElementById("confirmDelete")
    btnDelete.addEventListener("click" , ()=>{
        tasks = tasks.filter(element => element.taskId != id)
        console.log(tasks);
        projectList[indexOfProject].taskList = tasks
        console.log(projectList[indexOfProject]);
        showListTask(tasks)
    })
}
// projectList[indexOfProject].taskList = "";
// console.log(projectList);
// console.log("akjsdhflkah");
