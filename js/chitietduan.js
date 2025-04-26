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

