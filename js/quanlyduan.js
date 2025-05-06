
let user = JSON.parse(sessionStorage.getItem("account")) // 1 đối tượng là tài khoản đăng nhập{name email id}
// user = {id: 2, name:"nguyen van a"} //cmt hoặc không để hiểu rõ hơn về user= project owner 
if(user == null ){
    location.assign("./login.html")
}
let owner = {userId: user.id, role: "project owner"};

// console.log(owner);
// console.log(user);
// let project = [
//     {id: 1, projectName: "Học html",description: "hãy học kỹ để hiểu từ đầu", member: [{userId: 1, role: "project owner"}, {userId: 2, role: "project owner"}]},
//     {id: 2, projectName: "Học css cho html",description: "học và làm bài tập thật nhiều bạn sẽ thành supper frondendser", member: [{userId: 2, role: "project owner"}]},
//     {id: 3, projectName: "Học js và tiếp cận dự án",description:"hãy thật chăm và thật logic nó là gốc của backend đấy", member: [{userId: 1, role: "project Developer"}]},
// ];

let  countProductPerPage = 4;
let currentPage = 0;

let projectList = JSON.parse(localStorage.getItem("project"))
let totalpages = 0
let project = new Array()
function createProject(){
        project = new Array()
        projectList.forEach((element, index) =>{
            for(let e of element.member){
                if(e.userId == user.id && e.role == "project owner"){
                    project.push(element)
            }
        }
    })
    totalpages = Math.ceil(project.length/countProductPerPage)
}
createProject()
// let projectNode = [];
// console.log(project);

function showListProject(project){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    
    // show list
    let content = ""
    project.forEach((element) =>{
        let index = 0
        projectList.forEach((e, i)=>{
            if(element.id == e.id){
                index = i
            }
        })
        // if(user.id == element.member.userId ){
        content += `
                    <tr>
                        <td class="col-1">${element.id}</td>
                        <td class="col-8">${element.projectName}</td>
                        <td class="d-flex justify-content-between">
                            <button class="btn btn-warning col-3" type="button" class="btn btn-primary"
                            type="button" onclick="addorchange(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                >Sửa</button>
                            <button onclick="deleteProject(${element.id})" class="btn btn-danger col-3" type="button" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop">Xóa</button>
                            <a onclick="saveTask(${index} , ${element.id})" class="btn btn-primary col-5" href="./chitietduan.html" >Chi Tiết</a>
                        </td>
                    </tr>
        `
        //}
    })
    // project.forEach((element, index) => {
    //     let check = 0;
    //     for(let e of element.member){
    //         if(user.id == e.userId && e.role == "project owner"){
    //             content += `
    //                 <tr>
    //                     <td class="col-1">${element.id}</td>
    //                     <td class="col-8">${element.projectName}</td>
    //                     <td class="d-flex justify-content-between">
    //                         <button class="btn btn-warning col-3" type="button" class="btn btn-primary"
    //                         type="button" onclick="addorchange(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"
    //                             >Sửa</button>
    //                         <button onclick="deleteProject(${element.id})" class="btn btn-danger col-3" type="button" data-bs-toggle="modal"
    //                             data-bs-target="#staticBackdrop">Xóa</button>
    //                         <a class="btn btn-primary col-5" href="./chitietduan.html">Chi Tiết</a>
    //                     </td>
    //                 </tr>
    //             `
    //         }
    //     }
    // })
    
    tbody.innerHTML = content;


    // pagination hiển thị chân trang
    let chan = document.getElementById("pagination")
    chan.innerHTML = ""
    // console.log(new Array(totalpages).fill(1));
    
    let pageHTML = new Array(totalpages).fill(1).reduce((temp,_ , index) => temp+ `<li class="page-item ${currentPage == index? 'active' :''}" onclick = "goToPage(${index})"><a class="page-link" href="#">${index + 1}</a></li>`, "")

    pageHTML = `
        <li class="page-item ${currentPage == 0?'disabled':''}" onclick="prevPage()">
            <a class="page-link">&lt;</a>
        </li>
        ${pageHTML}
        <li class="page-item ${currentPage == totalpages-1?'disabled':''}" onclick="nextPage()">
            <a class="page-link">></a>
        </li>
        `
    chan.innerHTML = pageHTML
}
showListProject(project);

function nextPage (){
    if(currentPage < totalpages - 1){
        currentPage++;
        showListProject(paginationProject(currentPage))
        console.log(currentPage)
    }
}
function prevPage(){
    if(currentPage > 0){
        currentPage-- 
        showListProject(paginationProject(currentPage))
    }
}




function deleteProject(id){
    let deleteProject = document.getElementById("deleteProject")
    deleteProject.innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-danger" id="delete" data-bs-dismiss="modal">Xóa</button>`
    let del = document.getElementById("delete");
    del.addEventListener("click", ()=>{
        projectList = projectList.filter(element => element.id != id);
        localStorage.setItem("project", JSON.stringify(projectList))
        createProject();
        showListProject(paginationProject(currentPage));
        // console.log(project);
    })
}

let divAOE = document.getElementById("btnAOE")
// thêm mới và sửa
function addorchange(x){
    divAOE.innerHTML = "";
    let form = document.getElementById("form")
    // let send1 = document.getElementById("submit1")
    // let send2 = document.getElementById("submit2")
    
    let eProject = document.getElementById("eProject")
    let eDescription = document.getElementById("eDescription")
    
    if(x == -1){
        eProject.textContent = ""
        eDescription.textContent = ""
        divAOE.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button type="button" class="btn btn-primary"  id="submit1">Lưu mới</button>
        `
        let send1 = document.getElementById("submit1")
        let check = 0;
        let checkExist = 1;
        form.reset()
        send1.addEventListener("click", ()=>{
            // lay noi dung các input và validat giá trị
            let newProject = form.project.value;
            let description = form.description.value;
            
            // ten du an
            if(newProject == "" || newProject.length > 50){
                eProject.textContent = "Không được bỏ trống tên dự án và giới hạn 50 ký tự"
            }else{
                project.forEach(element =>{
                    if(element.projectName == newProject){
                        checkExist = -1;
                    }
                })
                if(checkExist == -1){
                    eProject.textContent = "Tên danh mục đã tồn tại"
                } else{
                    eProject.textContent = ""
                    check += checkExist;
                }
            }
            // mo ta
            if(description == "" || description.length > 100){
                eDescription.textContent = "Không được bỏ trống mô tả dự án và giới hạn 100 ký tự"
            }else{
                check++;
                eDescription.textContent = "";
            }

            // luu du lieu
            if(check == 2){
                let max = 0;
                // tao id cho du an
                projectList.forEach(element => {
                    if(max < element.id){
                        max = element.id;
                    }
                })
                let member = [];
                // member.push({userId: "", role: """})
                // 
                max++;
                let id = max;
                project.push({id, projectName: newProject, description, "member": [owner]});
                projectList.push({id, projectName: newProject, description, "member": [owner]});
                window.location.reload();
                // console.log("thanh cong");
                // window.alert("them moi thanh cong")

                form.reset();
                // project[project.length - 1]["member"].push(member)
                console.log(project);
                localStorage.setItem("project", JSON.stringify(projectList))
            }

            // thêm vào project
        })
    }else{
        divAOE.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        <button type="button" class="btn btn-primary"  id="submit2">Lưu thay đổi</button>
        `
        let send2 = document.getElementById("submit2")
        // sua project name 
        // send1.style.display = "none"
        // send2.style.display = "block"
        eDescription.textContent =""
        eProject.textContent = ""
        let temp = ""
        project.forEach(element =>{
            if(element.id == x){
                form.project.value = element.projectName
                form.description.value = element.description
            }
        })
        // nhận lệnh thay đổi
        send2.addEventListener("click" , ()=>{
            let checkCount = 1;
            for(let element of project){
                if(element.id === x){
                    continue
                }else{
                    if(element.projectName == form.project.value ){
                        checkCount = 0
                        eProject.textContent = "tên dự án không được trùng với dự án khác"
                        break
                    }
                }
            }
            if(checkCount == 1){
                projectList.forEach((element, index) =>{
                    if(element.id === x){
                        projectList[index].projectName = form.project.value
                        projectList[index].description = form.project.description
                        localStorage.setItem("project", JSON.stringify(projectList))
                        window.location.reload();
                    }
                })
            }
        })
    }
}

function search(){
    let inputSearch = document.getElementById("inputsearch")

    
    inputSearch.addEventListener("change", ()=>{
        
        let duan = project.filter(element => element.projectName.includes(inputSearch.value))
        showListProject(duan)
    })
}
search();



// const paginationProduct = (page)=>{
//     let startIndex = page*countProductPerPage
//     let endIndex = startIndex + countProductPerPage
//     return project.slice(startIndex, endIndex)
// }

// thay vì làm công việc duyệt kiểm tra tồn tại userId trong member của project
// thì ta có thể tạo ra 1 projectrOwner có chứa tất cả phần tử thuộc quyền sở hưu của user (project owner)
// từ đấy thao tác với project Owner


// luu vao session storage để khi bấm vào chi tiết dự án nó sẽ có dữ liệu của các task trong project

    // sessionStorage.clear()
    // sessionStorage.setItem("taskList", JSON.stringify(task))
    // sessionStorage.setItem("indexOfProject", JSON.stringify(x))

// omg it's so complex i can't understand that
function saveTask(index , id){
    // sessionStorage.clear()
    // lưu index ở ss storage
    // index project
    let indexOfProject
    projectList.forEach((element, i) =>{
        if(id == element.id){
            indexOfProject = i
        }
    })
    sessionStorage.setItem("indexOfProject", JSON.stringify(indexOfProject))
}


// phan trang


function paginationProject(page){
    let startIndex = page*countProductPerPage
    let endIndex = startIndex + countProductPerPage
    return project.slice(startIndex, endIndex)
}

showListProject(paginationProject(currentPage))

function goToPage (page){
    currentPage = page
    showListProject(paginationProject(currentPage))
}

// the phan trang