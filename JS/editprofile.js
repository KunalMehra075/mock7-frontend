let token = localStorage.getItem("token")
let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    alert("Please Login ");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
} else {
    RenderData(user);
}

function RenderData(item) {
    let container = document.getElementById("container");
    let data = `
    <form id="EditForm" data-id="${item._id}">
    <label>Enter  Name </label><br>
    <input type="text" id="name" placeholder="Enter Name" value=${item.name} required /><br />
    <label>Enter Bio  </label><br>
    <input type="text" id="bio" placeholder="Enter Bio" value=${item.bio} required /><br />
    <label>Enter ImageURL  </label><br>
    <input type="text" id="image" placeholder="Enter Image URL" value=${item.image} required /><br />
    <label>Enter Phone  </label><br>
    <input type="number" id="phone" placeholder="Enter Phone" value=${item.phone} required /><br />
    <label>Enter Email  </label><br>
    <input type="text" id="email" placeholder="Enter Email" value=${item.email} required /><br />
    <input type="submit" data-id=${item._id} value="Save Changes" />

  </form>

    
    `;
    container.innerHTML = data;
    let EditForm = document.getElementById("EditForm")
    EditForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let id = e.target.dataset.id
        let editor = {
            name: EditForm.name.value,
            bio: EditForm.bio.value,
            image: EditForm.image.value,
            phone: EditForm.phone.value,
            email: EditForm.email.value
        }
        EditTheUserRequest(id, editor);
    })
}

async function EditTheUserRequest(id, editor) {
    try {
        let res = await fetch(`${baseURL}/users/edit/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }, body: JSON.stringify(editor)
        });
        let data = await res.json();
        console.log(data)//! remove later
        if (data.success) {
            InvalidateData(id)
            alert("Edited User Successfully")

        } else {
            alert(data.Message)
        }
    } catch (error) {
        console.log(error)
    }
}

async function InvalidateData(id) {
    try {
        let res = await fetch(`${baseURL}/users?_id=${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }

        });
        let data = await res.json();
        // console.log(data)//! remove later
        let user = data.Users[0]
        localStorage.setItem("user", JSON.stringify(user))
        setTimeout(() => {
            window.location.href = "profile.html"
        }, 700);
    } catch (error) {
        console.log(error)
    }
}


Logout.addEventListener("click", () => {
    localStorage.clear();
    alert("Loggin Out");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});



