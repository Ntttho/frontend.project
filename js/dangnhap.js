// let accountList = [{id: 1, email: "nguyentatho14106@gmail.com", password: "12345678", name:"nguyen ta tho"}]

let accountList = JSON.parse(localStorage.getItem("account"))

let form = document.getElementById("login")
let eEmail = document.getElementById("eEmail")
let epass = document.getElementById("ePass")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    // lấy nội dung thông tin đăng nhập
    let email = form.email.value;
    let pass = form.password.value;

    // thông tin đăng nhập phải đúng
    let check = 0;
    let saveIndex = 0;
    let checkExist = 0;
    if(email == ""){
        eEmail.textContent = "Email không được để trống"
    }else{
        eEmail.textContent = ""
        check ++;    
    }
    if(pass == "" || pass.length < 8){
        epass.textContent = "Mất khẩu không được để trống và lớn hơn 8 ký tự"
        form.password.value = '';
    }else{
        check++;
    }
    if(check == 2){
        accountList.forEach((element, index) =>{
            if(element.password == pass && element.email == email){
                checkExist++;
                saveIndex = index
            }
        })
        if(checkExist == 1){
            sessionStorage.setItem("account", JSON.stringify(accountList[saveIndex]))
            // acount => {id email name pass}
            form.reset();
            location.assign("./quanlyduan.html");
        }else{
            // eEmail.textContent = "Sai email hoặc sai mật khẩu"
            form.password.value = ''
            epass.textContent = "Sai email hoặc mật khẩu"
        }
    }
})