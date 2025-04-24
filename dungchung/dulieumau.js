

let account = [{id: 1, email: "nguyentatho14106@gmail.com", password: "12345678", name:"nguyen ta tho"}]


localStorage.setItem("account", JSON.stringify(account))

let project = [
    {id: 1, projectName: "Xây dựng wedsite thương mại điện tử", member: [{userId: 1, role: "project Developer"}]},
    {id: 2, projectName: "Xây dựng wedsite thương mại điện tử", member: [{userId: 1, role: "project Developer"}]},
    {id: 3, projectName: "Xây dựng wedsite thương mại điện tử", member: [{userId: 1, role: "project Developer"}]},
];

localStorage.setItem("project", JSON.stringify(project));


