// project
// projectList
// indexOfProject
//account

let indexOfProject = JSON.parse(sessionStorage.getItem("indexOfProject"))
console.log(indexOfProject);

let projectList = JSON.parse(localStorage.getItem("project"))
let account = JSON.parse(localStorage.getItem("account"))
let accountList = JSON.parse(localStorage.getItem("account"))

let tasks = new Array()

if(projectList[indexOfProject].taskList === undefined){
    projectList[indexOfProject].taskList = new Array()
    // console.log(1);
}else{
    tasks = projectList[indexOfProject].taskList
    console.log(projectList[indexOfProject].taskList);
}

console.log(projectList[indexOfProject].taskList)
console.log(tasks);


// lấy ra nút xác nhận xóa html
// show 
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



projectList[indexOfProject].taskList.forEach((element, index) =>{
    
    // lấy ra tên người phụ trách
    
    let assigneeName = ""
    for(let e of account){
        if(element.assigneeId == e.id || element.assigneeName != ""){
            assigneeName = e.name;
            break
        }
    }
    // luu vao tasks assigneeName
    tasks[index]["assigneeName"] = assigneeName
    let startDate = new Date(element.assignDate)
    // console.log(startDate);
    let endDate = new Date(element.dueDate)
    // console.log(endDate);
    
    if(element.status == "To do"){
        todo.innerHTML += `<tr>
                        <td>${element.taskName}</td>
                        <td class="text-center">${element.assigneeName}</td>
                        <td class="text-center">
                            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
                        </td>
                        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
                        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
                        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
                        <td onclick="addOrEdit(${element.taskId})" class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
                            <button onclick="deleteTask(${element.taskId})" class="btn btn-danger" type="button" data-bs-toggle="modal"
                                data-bs-target="#modalDelete">Xóa</button>
                        </td>
                    </tr>`
    }else if(element.status == "In Progress"){
        inProgress.innerHTML += `<tr>
                        <td>${element.taskName}</td>
                        <td class="text-center">${assigneeName}</td>
                        <td class="text-center">
                            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
                        </td>
                        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
                        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
                        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
                        <td onclick="addOrEdit(${element.taskId})" class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
                            <button onclick="deleteTask(${element.taskId})" class="btn btn-danger" type="button" data-bs-toggle="modal"
                                data-bs-target="#modalDelete">Xóa</button>
                        </td>
                    </tr>`
    }else if(element.status == "Pending"){
        pending.innerHTML += `<tr>
                        <td>${element.taskName}</td>
                        <td class="text-center">${assigneeName}</td>
                        <td class="text-center">
                            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
                        </td>
                        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
                        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
                        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
                        <td onclick="addOrEdit(${element.taskId})" class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
                                data-bs-toggle="modal" data-bs-target="#modal1">Sửa</button>
                            <button onclick="deleteTask(${element.taskId})" class="btn btn-danger" type="button" data-bs-toggle="modal"
                                data-bs-target="#modalDelete">Xóa</button>
                        </td>
                    </tr>`
    }else if(element.status == "Done"){
        done.innerHTML += `<tr>
                        <td>${element.taskName}</td>
                        <td class="text-center">${assigneeName}</td>
                        <td class="text-center">
                            <span class="${(element.priority == "thap") ? "bg-info" : (element.priority == "cao") ? "bg-danger" : (element.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light ">${element.priority}</span>
                        </td>
                        <td class="date">${startDate.getMonth()+1 + "-" + startDate.getDate()}</td>
                        <td class="date">${endDate.getMonth()+1 + "-" + endDate.getDate()}</td>
                        <td class="text-center"><span class="${(element.progress == "dung tien do" ?"bg-success" : (element.progress == "co rui ro") ? "bg-warning" : (element.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light ">${element.progress}</span></td>
                        <td onclick="addOrEdit(${element.taskId})" class="d-flex justify-content-between"><button class="btn btn-warning" type="button"
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
    let divDeleteTask = document.getElementById("btndeleteTask")
    divDeleteTask.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="confirmDelete">xác nhận
                    xóa</button>`
    let btnDelete = document.getElementById("confirmDelete")
    btnDelete.addEventListener("click" , ()=>{
        tasks = tasks.filter(element => element.taskId != id)
        projectList[indexOfProject].taskList = tasks
        showListTask(tasks)
        localStorage.setItem("project", JSON.stringify(projectList))
    })
}

// them va sua tren cung 1 form
function addOrEdit(x){
    // tạo btn lưu và hủy
    let btnEOA = document.getElementById("btnEOA")
    btnEOA.innerHTML = ""

    /*
    form-member
    1. taskname
    2. selectAssigneeNames
    3. status
    4. assignDate
    5. dueDate
    6. priority
    7. progress
    ====end====
    */
    let form = document.getElementById("addOrEdit")
    // tao cho select option voi cac thanh vien
    let selectName = document.getElementById("selectAssigneeNames")
    selectName.innerHTML = `<option value="null" disabled selected>chọn người phụ trách</option>`

    // tạo các option cho select (chọn người phụ trách)
    console.log(indexOfProject);
    
    projectList[indexOfProject]["member"].forEach(element =>{
        accountList.forEach(e =>{
            console.log(e.id, element.userId, e.name);
            
            if(e.id == element.userId){
                selectName.innerHTML += `<option value="${e.name}">${e.name}</option>`
            }
        })
    })

    // lấy ra các thể p nhằm thông báo lỗi
    let eTN = document.getElementById("eTN")
    eTN.textContent = ""

    let eAN = document.getElementById("eAN")
    eAN.textContent = ""

    let eStt = document.getElementById("eStt")
    eStt.textContent = ""

    let eAD = document.getElementById("eAD")
    eAD.textContent = ""

    let eDD = document.getElementById("eDD")
    eDD.textContent = ""

    let ePri = document.getElementById("ePri")
    ePri.textContent = ""

    let ePro = document.getElementById("ePro")
    ePro.textContent = ""

    // tao điều kiện vào trường hợp sửa hoặc xóa
    if(x == -1){
        form.reset()
        //
        btnEOA.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button id="btnAddTask" type="button" class="btn btn-primary">Lưu mới</button>
        `
        let btnA = document.getElementById("btnAddTask")
        console.log(-1);
        btnA.addEventListener("click", () =>{

            // task =>taskid taskname status assigndate duedate priority assigneeName progress (8 là đủ)
            // console.log(form);
            let taskId = 0;
            tasks.forEach(element => {
                if(element.taskId >= taskId){
                    taskId = element.taskId + 1;
                }
                // id task nó sẽ luôn khác với các id khác và lớn nhất 
            });
            console.log(form);

            let taskName = form.taskname.value;
            let status = form.status.value;
            let assignDate = form.assignDate.value; // lấy từ member
            let dueDate = form.dueDate.value;
            let priority = form.priority.value;
            let progress = form.progress.value;
            let assigneeName = form.selectAssigneeNames.value;
            // ten nguoi phu trach

            // validate()
            let check = 0;
            let checkdate = 0
            if(taskName == "" || taskName.length > 50){
                eTN.textContent = "không được bỏ trông tên nhiệm vụ và giới hạn 50 ký tự"
            }else{
                let checkExist = 1;
                tasks.forEach(el =>{if(el.taskName == taskName){checkExist=0}})
                    if(checkExist == 0){
                        eTN.textContent = "Tên nhiệm vụ không được trùng"
                    }else{
                        eTN.textContent = ""
                        check++; // 1
                    }
            }
            
            if(status == "null"){
                eStt.textContent = "Bắc buộc phải chọn trạng thái của nhiệm vụ"
            }else{
                eStt.textContent = ""
                check++; // 2
            }

            if((new Date(dueDate)).getTime() >= (new Date(assignDate)).getTime() && checkdate == 2){
                eDD.textContent = "Chọn thời gian không hợp lý"
                eAD.textContent = "Chọn thời gian không hợp lý"
            } else{
                eDD.textContent = ""
                eAD.textContent = ""
                check++;    // 5
            }

            if((new Date()).getTime() > (new Date(assignDate)).getTime()){
                eAD.textContent = "Thời gian này không hợp với hiện tại"
            }else{
                check++; // 9

                if(assignDate == ""){
                    eAD.textContent = "Bạn phải chọn ngày giao nhiệm vụ"
                }else{
                    eAD.textContent = "";
                    check++; // 3
                    checkdate++
                }

                if(dueDate == ""){
                    eDD.textContent = "Bạn phải chọn ngày đến hạn của nhiệm vụ"
                }else{
                    eDD.textContent = ""
                    eAD.textContent = ""
                    check++;    // 4
                    checkdate++
                }
            }

            if(priority == "null"){
                ePri.textContent = "Không được bỏ trống độ ưu tiên nhiệm vụ"
            }else{
                ePri.textContent =""
                check++; // 6
            }

            if(progress == "null"){
                ePro.textContent = "Không được để trống tiến trình nhiệm vụ"
            }else{
                ePro.textContent = ""
                check++; // 7
            }

            if(assigneeName == "null"){
                console.log(assignDate);
                eAN.textContent = "Người phụ trách công việc không thể bỏ trông được"
            }else{
                eAN.textContent = ""
                check++; // 8
            }

            if(check == 9){
                tasks.push({taskId, taskName, assigneeName, status, assignDate, dueDate, priority, progress});
                console.log(tasks);
                projectList[indexOfProject].taskList = tasks
                localStorage.setItem("project", JSON.stringify(projectList))
                showListTask(tasks)
                form.reset();
            }
        })

        }else{
            console.log(x);
            
            btnEOA.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button id="btnEditTask" type="button" class="btn btn-primary">Lưu thay đổi</button>
                `
            let btnE = document.getElementById("btnEditTask")
            // đưa thông tin, dữ liệu lên form modal
            for(let e of projectList[indexOfProject].taskList){
                if(x == e.taskId ){
                    form.taskname.value = e.taskName
                    form.selectAssigneeNames.value = e.assigneeName
                    form.status.value = e.status
                    form.assignDate.value = e.assignDate
                    form.dueDate.value = e.dueDate
                    form.priority.value = e.priority
                    form.progress.value = e.progress
                    break
                }
            }
            btnE.addEventListener("click", ()=>{
                console.log(tasks);
                //sua nhiem vu
                for(let e in projectList[indexOfProject].taskList){
                    if(x == projectList[indexOfProject].taskList[e].taskId ){

                        for(let a of account){
                            if(a.name == form.selectAssigneeNames.value){
                                projectList[indexOfProject].taskList[e].assigneeId = a.id
                            }
                        }

                        projectList[indexOfProject].taskList[e].taskName = form.taskname.value
                        projectList[indexOfProject].taskList[e].status = form.status.value
                        projectList[indexOfProject].taskList[e].assignDate = form.assignDate.value
                        projectList[indexOfProject].taskList[e].dueDate = form.dueDate.value
                        projectList[indexOfProject].taskList[e].priority = form.priority.value
                        projectList[indexOfProject].taskList[e].progress = form.progress.value
                        projectList[indexOfProject].taskList[e].assigneeName = ""
                        tasks = projectList[indexOfProject].taskList
                        localStorage.setItem("project", JSON.stringify(projectList))
                        console.log("pro1",projectList[indexOfProject].taskList[e]);
                        console.log("pro2",projectList[indexOfProject].taskList);
                        console.log("tasks:", tasks);
                        showListTask(tasks)
                        break
                    }
                }
            })

            // btnE.addEventListener("click")
            
            //=========================================
        }
}
// thêm thành viên mới
// console.log(projectList);

function searchTask (){
    let inputSearch = document.getElementById("inputsearch")
    inputSearch.addEventListener("change", ()=>{
        let content = inputSearch.value;
        let tempTask = tasks.filter(element => element.taskName.trim().includes(content.trim()));
        showListTask(tempTask);
    })
}
searchTask();

function showMember(){
    let check = 0;
    let memberDiv = document.getElementById("member")
    memberDiv.innerHTML = ""
    projectList[indexOfProject].member.forEach((element, index) =>{
        if(element.role == "project owner"){
            let name = ""
            for(let x of accountList){
                if(x.id == element.userId){
                    projectList[indexOfProject].member[index].name = x.name
                    projectList[indexOfProject].member[index].email = x.email
                    check++;
                    break
                }
            }
            // accountList.forEach(el =>{
                //     if(element.userId == el.id){
            //         projectList[indexOfProject].member[index].name = el.name
            //     }
            // })
            memberDiv.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="avt ">AN</div>
                            <div>
                                <h6>${element.name}</h6>
                                <p>${element.role}</p>
                        </div>
                    </div>
            `
        }
        
        if(check == 2){
            return;
        }
    })
    memberDiv.innerHTML += `<div class="d-flex justify-content-between align-items-center">
                <button onclick="showfullMember()" class="avt btn bg-secondary d-flex justify-content-between align-items-center" type="button"
        data-bs-toggle="modal" data-bs-target="#modal3">ooo</button>
            </div>`
}

showMember()

function showfullMember(){
    let modalMember = document.getElementById("modalMember")
    // console.log(modalMember);
    modalMember.innerHTML = ''
    projectList[indexOfProject].member.forEach((element, index) =>{
        for(let x of accountList){
            if(x.id == element.userId){
                projectList[indexOfProject].member[index].name = x.name
                projectList[indexOfProject].member[index].email = x.email
                break
            }
        }

        modalMember.innerHTML+= `
                        <tr>
                            <td>
                                <div class="avt">AVT</div>
                            </td>
                            <td>
                                <div class="d-flex flex-column">
                                    <h5>${element.name}</h5>
                                    <p>${element.email}</p>
                                </div>
                            </td>
                            <td class="">
                                <p class="border">${element.role}</p>
                            </td>

                            <td><td><i onclick="deleteMember(${element.userId})" class="fa-solid fa-trash btn text-danger"></i></td>
</td>
                        </tr>`
    })
}

function addnewMember( x ){
    if(x == 1){
        let form = document.getElementById("addmember")
        form.reset()
        let ftadd = document.getElementById("ftadd")
        ftadd.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy </button>
                    <button id="addNewMember" type="button" class="btn btn-primary">Lưu</button>`
        let add = document.getElementById('addNewMember')

        
        let eEmailMember = document.getElementById("eEmailMember")
        eEmailMember.textContent = ""
        let eRole = document.getElementById("eRole")
        eRole.textContent = ""
        
        
        add.addEventListener('click', ()=>{
            let email = form.email.value
            let role = form.role.value
            
            //valiudate
            let check = 0;
            let indexOfAccount = 0
            // 1. email và role không được để trống
            // 2. thành viên thêm vào phải chưa có trong danh sách thành viên
            // 3. Email phải đúng định dạng
            // 4. hiển thị lỗi khi thông tin thành viên không hợp lệ
            // 5. thêm mới thành viên khi ẩn nút lưu lại trên modal
            
            // email
            if(email == ""){
                eEmailMember.textContent = "Email không được để trống"
            }else if(!checkEmail(email)){
                eEmailMember.textContent = "Email không đúng yêu cầu định dạng"
            } else{
                for(let element of projectList[indexOfProject].member){
                    if(element.email == email){
                        eEmailMember.textContent = "thành viên này đã tồn tại trong dự án dồi"
                        check = 0
                        break;
                    }else{
                        eEmailMember.textContent = ""
                        check = 1
                    }
                }
            }

            // role
            if(role == ""){
                eRole.textContent = "Vai trò không được để trống"
            }else{
                eRole.textContent = ""
                check++;
            }

            if(check == 2){
                for(let element of account){
                    if(element.email == email){
                        let ob = {email: element.email, userId: element.id, name: element.name, role: role}
                        projectList[indexOfAccount].member.push(ob)
                        localStorage.setItem("project", JSON.stringify(projectList))
                        showMember()
                        form.reset()
                        break
                    }else{
                        check = 3
                    }
                }
            }
            if(check == 3){
                eEmailMember.textContent = "Email này không tồn tại"
            }
            
        })
    }
}





function checkEmail(email) {
    if (email.length >= 60) {
    return false;
    }

    if (!email.includes("@gmail")) {
    return false;
    }

    if (!email.endsWith(".com") && !email.endsWith(".vn")) {
    return false;
    }

    const checkcheck = /^[a-zA-Z0-9._-]+@gmail\.(com|vn)$/;
    if (!checkcheck.test(email)) {
    return false;
    }

    return true;
}

function deleteMember(id){
    
    let btnDeleteMember = document.getElementById("modalDeleteMember")
    console.log("hello anh em");
    console.log(id);
    console.log(projectList[indexOfProject].member);
    
    // projectList[indexOfProject].member = projectList[indexOfProject].member.filter(element =>{element.userId != id && element.role != projectList })
    // localStorage.setItem("project", JSON.stringify(projectList))
    showMember()
    // showfullMember()
}









































