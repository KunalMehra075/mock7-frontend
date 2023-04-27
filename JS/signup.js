
let SignupForm = document.getElementById("SignupForm")
SignupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let pass = SignupForm.password.value;
    let cnfpass = SignupForm.cnfpassword.value;
    if (pass !== cnfpass) {
        alert("Passwords should match")
        return
    }
    let newuser = {
        name: SignupForm.name.value,
        password: SignupForm.password.value,
        bio: SignupForm.bio.value,
        image: SignupForm.image.value,
        phone: SignupForm.phone.value,
        email: SignupForm.email.value
    }
    PostNewUser(newuser);
})
async function PostNewUser(newuser) {
    try {
        let res = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify(newuser)
        });
        let data = await res.json();
        console.log(data)//! remove later
        if (data.success) {
            alert("Signup Successful, Please Login")
            setTimeout(() => {
                window.location.href = "signin.html"
            }, 1000);
        } else {
            alert(data.Message)
        }
    } catch (error) {
        console.log(error)
    }
}