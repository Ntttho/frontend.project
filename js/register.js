let accountList = JSON.parse(localStorage.getItem("account"));


let form = document.getElementById("register");
form.reset;
// console.log(form);
// lấy các thẻ p thông báo lỗi
let eName = document.getElementById("eName")
let eEmail = document.getElementById("eEmail")
let ePass = document.getElementById("ePass")
let eConfirm = document.getElementById("eConfirm")

// console.log(eName, eEmail, ePass, eConfirm);






form.addEventListener("submit", (e)=>{
    let check = 0;
    let checkAccount = 0;
    // ngăn chặn các mặc định của form (reset form)
    e.preventDefault();

    // lấy các thuộc tính của form
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let confirmPassword = form.confirmPassword.value;

    // validate dữ liệu cho form
    
    // 1. Họ và tên không được bỏ trống
    if(name == ""){
        console.log("botrong");
        check--;
        eName.textContent = "Họ và tên không được để trống";
    }else{
        eName.textContent = "";
        check++;
    }
    // 2. Email không được để trống, không được trùng, đúng định dạng
    if(email == ""){
        eEmail.textContent = "Email không được bỏ trống";
    }else if(validateEmail(email) == null){
        eEmail.textContent = "Email không đúng định dạng";
    }else{
        accountList.forEach(element => {
            if(element.email == email){
                checkAccount = -1;
            }else{
                checkAccount = 1;
            }
        })
        check += checkAccount;
        if(checkAccount == -1){
            eEmail.textContent = "Email này đã có trước đó";
        }else{
            eEmail.textContent = "";
        }
    }
    // 3. password phải có ít nhất 8 ký tự 
    console.log(password);
    console.log(password.length)
    if(password.length < 8 || password == null){
        console.log(password);
        ePass.textContent = "mật khẩu dài hơn 8 ký tự "
        form.password.value = "";
    }else{
        // console.log(1);
        check++;
        ePass.textContent = ""
    }
    // 4. confirm password không được bỏ trống và trùng với password 
    if(confirmPassword == null ){
        eConfirm.textContent = "xác nhận mật khẩu không được để trống"
    }else if(confirmPassword != password){
        eConfirm.textContent = "Không đúng với mật khẩu hiện có"
        form.confirmPassword.value = ""
    }else{
        eConfirm.textContent  = ""
        check ++;
    }
console.log(confirmPassword == password ? 1 : 2);

    console.log({name, email, password});
    
    if(check == 4){
        form.reset();
        const s = new Date();
        let id = s.getTime();
        alert("Chúc mừng bạn đăng ký thành công!")
        accountList.push({id, name, email, password});
        localStorage.setItem("account", JSON.stringify(accountList));
        location.assign("../phuj/quanlyduan.html");
    }
    // console.log({name, email, password, confirmPassword});
})

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};