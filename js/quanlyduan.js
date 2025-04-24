// let user = JSON.parse(sessionStorage.getItem("account")) // 1 đối tượng là tài khoản đăng nhập
let project = [
    {id: 1, projectName: "Học html",description: "hãy học kỹ để hiểu từ đầu", member: [{userId: 1, role: "prorject owner"}]},
    {id: 2, projectName: "Học css cho html",description: "học và làm bài tập thật nhiều bạn sẽ thành supper frondendser", member: [{userId: 1, role: "project Developer"}]},
    {id: 3, projectName: "Học js và tiếp cận dự án",description:"hãy thật chăm và thật logic nó là gốc của backend đấy", member: [{userId: 1, role: "project Developer"}]},
];
// console.log(project);

function showListProject(){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    
    // show list
    let content = ""
    project.forEach(element =>{
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
                            <a class="btn btn-primary col-5">Chi Tiết</a>
                        </td>
                    </tr>
        `
        //}
    })
    tbody.innerHTML = content;
}
showListProject();

function deleteProject(id){
    let del = document.getElementById("delete");
    del.addEventListener("click", ()=>{
        project = project.filter(element => element.id != id);
        showListProject();
        console.log(project);
    })
}

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
                project.forEach(element => {
                    if(max < element.id){
                        max = element.id;
                    }
                })
                max++;
                let id = max;
                project.push({id, projectName: newProject, description})
            }






            // thêm vào project

        })
    }else{
        send1.style.display = "none"
        send2.style.display = "block"
    }
}