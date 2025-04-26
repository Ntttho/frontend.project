
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

let projectList = JSON.parse(localStorage.getItem("project"))

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
}
createProject()
// let projectNode = [];
// console.log(project);

function showListProject(project){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    
    // show list
    let content = ""
    project.forEach((element, index) =>{
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
                            <a class="btn btn-primary col-5" href="./chitietduan.html">Chi Tiết</a>
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
}
showListProject(project);

function deleteProject(id){
    let del = document.getElementById("delete");
    del.addEventListener("click", ()=>{
        projectList = projectList.filter(element => element.id != id);
        localStorage.setItem("project", JSON.stringify(projectList))
        createProject();
        showListProject(project);
        // console.log(project);
    })
}


// thêm mới và sửa
function addorchange(x){
    let form = document.getElementById("form")
    let send1 = document.getElementById("submit1")
    let send2 = document.getElementById("submit2")

    let eProject = document.getElementById("eProject")
    let eDescription = document.getElementById("eDescription")

    if(x == -1){
        let check = 0;
        let checkExist = 1;

        send2.style.display = "none"
        send1.style.display = "block"
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
                showListProject(project);
                // console.log("thanh cong");
                window.alert("them moi thanh cong")

                form.reset();
                // project[project.length - 1]["member"].push(member)
                console.log(project);
                localStorage.setItem("project", JSON.stringify(projectList))
            }

            // thêm vào project
        })
    }else{
        // sua project name 
        send1.style.display = "none"
        send2.style.display = "block"
        eDescription.textContent =""
        eProject.textContent =""
        // console.log(x);
        // let checksearch = 0;

        // đưa name and description vào ô input
        for(let element of project){
            if(element.id == x){
                form.project.value = element.projectName;
                form.description.value = element.description;
                break;
            }
        }

        // submit => validate => save
        send2.addEventListener("click",() =>{
            let checkExist = 1;
            let check = 0;
            // validate
            let projectName = form.project.value
            let description = form.description.value
            // validate name project
            if(projectName == "" && projectName.length > 50){
                eProject.textContent = "Không được bỏ trống và giới hạn 50 ký tự"
            }else{
                // kiem tra xem projectname co trung lap khong
                projectList.forEach((element) => {
                    if(element.id != x ){
                        console.log(x, element.id);
                        if(projectName == element.projectName){
                            console.log(project, element.projectName);
                            checkExist = 0;
                        }
                    }
                });
                // kiem tra ton tai = 0 thi se trung lap va in ra ko thi thoi
                if(checkExist == 0){
                    eProject.textContent = "Tên dự án không được trùng"
                }else{
                    eProject.textContent ="";
                    check ++;
                }
            }
            // validate description
            if(description == "" || description.length > 100){
                eDescription.textContent = "Không được bỏ trống mô tả và giới hạn 100 ký tự"
            }else{
                check++;
            }

            if(check == 2){
                projectList.forEach((element, index) => {
                    if(element.id == x){
                        projectList[index].projectName = projectName
                        projectList[index].description = description
                    }
                });
                createProject();
                console.log(project);
                localStorage.setItem("project", JSON.stringify(projectList))
                showListProject(project);
            }
        })
    }
}

function search(){
    let inputSearch = document.getElementById("inputsearch")
    inputSearch.addEventListener("change", ()=>{
        let duan = project.filter(element => element.projectName.includes(inputSearch.value))
        showListProject(duan);
    })
}
search();

let  countProductPerPage = 2;
let currentPage = 0;

// const paginationProduct = (page)=>{
//     let startIndex = page*countProductPerPage
//     let endIndex = startIndex + countProductPerPage
//     return project.slice(startIndex, endIndex)
// }

// thay vì làm công việc duyệt kiểm tra tồn tại userId trong member của project
// thì ta có thể tạo ra 1 projectrOwner có chứa tất cả phần tử thuộc quyền sở hưu của user (project owner)
// từ đấy thao tác với project Owner
