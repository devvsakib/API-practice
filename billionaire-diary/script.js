const username = document.getElementById("username")
const getUserName = prompt("Please enter username first to continue: ")
if (getUserName === null || getUserName === "") {
    alert("Please enter a valid username")
    window.location.reload()
}
if (getUserName) {
    username.innerText = getUserName;
        (async function () {
            try {
                const url = "https://forbes400.onrender.com/api/forbes400/"
                const res = await fetch(url);
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }())
} else {
    alert("Please enter a username")
    window.location.reload()
}
