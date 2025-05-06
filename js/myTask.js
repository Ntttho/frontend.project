let user = JSON.parse(sessionStorage.getItem("account"))
let account = JSON.parse(localStorage.getItem("account"))
console.log(account);

console.log(user);
let projectList = JSON.parse(localStorage.getItem("project"))


// cập nhập email cho project chua co email
projectList.forEach((project, index) =>{
    if(!project.member[0].email){
        account.forEach(u =>{
            if(u.id == project.member[0].userId){
                project.member[0].email = u.email
                console.log(project.member[0]);
                return
            }
        })
    }
    // cập nhập lại task
    if(!project.taskList){
        project.taskList = new Array()
    }else{
        project.taskList.forEach((task, ind) =>{
            
            for(let member of project.member){
                if(member.name == task.assigneeName){
                    projectList[index].taskList[ind].assigneeId = member.userId
                    break
                }
                if(member.userId == task.assigneeId){
                    projectList[index].taskList[ind].assigneeName = member.name
                    break
                }
            }
        })
    }
    localStorage.setItem("project", JSON.stringify(projectList))
})


function showListTask(){
    let projectTable = document.getElementById("Project")
    projectTable.innerHTML = ""
    projectList.forEach(project =>{
        for(let member of project.member){
            if(member.email == user.email){

                // xữ lý với project name
                // console.log(project.projectName);
                let projectNameTR = `
                        <tr>
                            <th class="" colspan="12"><button class="btn"> <span>></span><b>${project.projectName}</b></button></th>
                        </tr>
                `
                projectTable.innerHTML += projectNameTR            
                break;
            }
        }
        project.taskList.forEach(task =>{
            let taskTR = ""
            if(task.assigneeId == user.id){
                projectTable.innerHTML += `
                <tr>
                        <td>${task.taskName}</td>
                        <td class="text-center"><span class="${(task.priority == "thap") ? "bg-info" : (task.priority == "cao") ? "bg-danger" : (task.priority == "trung binh") ? "bg-warning" : ""} p-1 rounded  fw-bold  text-light  p-1 rounded  fw-bold  text-light ">${task.priority}</span>
                        <td class="text-center" >${task.status} <span type="button" class="btn btn" data-bs-toggle="modal"
                                data-bs-target="#modal"> <i class="fas fa-pencil-alt"></i></span>
                        </td>
                        <td class="text-info-emphasis text-center">${task.assignDate}</td>
                        <td class="text-info-emphasis text-center">${task.dueDate}</td>
                        <td class="text-center"><span class="${(task.progress == "dung tien do" ?"bg-success" : (task.progress == "co rui ro") ? "bg-warning" : (task.progress == "tre han") ?"bg-danger":"")} p-1 rounded fw-bold  text-light  p-1 rounded  fw-bold  text-light ">${task.progress}</span>
                </tr>
                `
            }
        })
    })
}

showListTask()
console.log("helji", projectList[0].taskList);
