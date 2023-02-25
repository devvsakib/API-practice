const users = document.getElementById("users")
const url = "https://api.github.com/users?per_page=10"

const getUsers = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (const user of data) {
                users.innerHTML += `
                <tr>
                <td>
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src=${user.avatar_url}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </td>
                <td>
                    <h2 class="font-bold">${user.login}</h2>
                </td>
                <td id="follower">
                <div class="avatar items-center mr-5">
                    <div class="mask mask-squircle w-12 h-12">
                        <img src="" alt="Avatar Tailwind CSS Component" />
                    </div>
                    <span class="badge badge-ghost badge-sm">follower1</span>
                </div>
                <div class="avatar items-center mr-5">
                    <div class="mask mask-squircle w-12 h-12">
                        <img src="" alt="Avatar Tailwind CSS Component" />
                    </div>
                    <span class="badge badge-ghost badge-sm">follower2</span>
                </div>
                                
                    <br />
                </td>
                <td><a class="text-blue-400 font-semibold" href="https://github.com/${user.login}?tab=repositories" target="_blank">REPO</a></td>
            </tr>
                
                `
            }
        })
}
getUsers()