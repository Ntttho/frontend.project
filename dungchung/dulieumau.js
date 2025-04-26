// localStorage.setItem("dulieumau", JSON.stringify(0))
let i = JSON.parse(localStorage.getItem("dulieumau"));

if(i == 0 || i == null ){

    localStorage.clear();
    
    let account = [{id: 1, email: "nguyentatho14106@gmail.com", password: "12345678", name:"nguyen ta tho"}]


localStorage.setItem("account", JSON.stringify(account))

let project = [
    {id: 1, projectName: "Xây dựng wedsite thương mại điện tử", member: [{userId: 1, role: "project owner"}]},
    {id: 2, projectName: "học lập trình frontend với html css và js", member: [{userId: 1, role: "project owner"}]},
    {id: 3, projectName: "Xây dựng wedsite thương mại điệử", member: [{userId: 2, role: "project owner"}]},
];

localStorage.setItem("project", JSON.stringify(project));

console.log(i);


i = 1;
localStorage.setItem("dulieumau", JSON.stringify(i))
}


