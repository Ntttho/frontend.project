localStorage.clear();
localStorage.setItem("dulieumau", JSON.stringify(0))
let i = JSON.parse(localStorage.getItem("dulieumau"));

if(i == 0 || i == null || i == undefined){

    localStorage.clear();
    
    let account = [{id: 1, email: "nguyentatho14106@gmail.com", password: "12345678", name:"nguyen ta tho"}]


    localStorage.setItem("account", JSON.stringify(account))

    let project = [
        {id: 1, projectName: "Xây dựng wedsite thương mại điện tử",
            member: [{userId: 1, role: "project owner"}], 
            taskList: [
                { assigneeId: 1, taskName: "soan thao de cuong",  assignDate: "2025-3-26", dueDate: "2025-4-1", priority: "thap", progress: "dung tien do", status: "To do"},
            ],
        },
        {id: 2, projectName: "học lập trình frontend với html css và js", 
            member: [{userId: 1, role: "project owner"}], taskList: [
            {assigneeId: 1, taskName: "Hoc cham hoc chi",  assignDate: "2025-3-26", dueDate: "2025-4-1", priority: "thap", progress: "dung tien do", status: "To do"},
        ],},
        {id: 3, projectName: "Xây dựng wedsite thương mại điệử",
            member: [{userId: 1, role: "project owner"}],taskList: [
            {assigneeId: 1, taskName: "soan thao de cuong",  assignDate: "2025-3-26", dueDate: "2025-4-1", priority: "thap", progress: "dung tien do", status: "Pending"},
        ],},
    ];

    localStorage.setItem("project", JSON.stringify(project));
// window.alert("aksdflk")

    i = 1;
    localStorage.setItem("dulieumau", JSON.stringify(i))
}


