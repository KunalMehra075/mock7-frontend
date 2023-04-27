

let LoginForm = document.getElementById("LoginForm")
LoginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let LoginUser = {
        password: LoginForm.password.value,
        email: LoginForm.email.value
    }
    PostLoginUser(LoginUser);
})
async function PostLoginUser(LoginUser) {
    try {
        let res = await fetch(`${baseURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify(LoginUser)
        });

        let data = await res.json();
        console.log(data)//!remove later
        if (data.success) {
            alert("Login Successful")
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            setTimeout(() => {
                window.location.href = "index.html"
            }, 1000);
        } else {
            alert(data.Message)
        }
    } catch (error) {
        console.log(error)
    }
}