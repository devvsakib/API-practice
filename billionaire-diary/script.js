const username = document.getElementById("username")
// const getUserName = prompt("Please enter username first to continue: ")
// if (getUserName === null || getUserName === "") {
//     alert("Please enter a valid username")
//     window.location.reload()
// }
// if (getUserName) {
//     username.innerText = getUserName;

// } else {
//     alert("Please enter a username")
//     window.location.reload()
// }

const fetchData = async type => {
    let url = "./api/Richest_People_API.json"
    let url2 = "./api/AllBillionaires.json"
    const response = await fetch(url);
    const data = await response.json();
    showTopRich(data)
}
fetchData()

function showTopRich(data) {
    data = data.slice(0, 3)
    for (const person of data) {
        document.getElementById("tableBody").innerHTML += `
        
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="${person.person.squareImage.slice(0, 6) === "https:" ? person.person.squareImage : "https:" + person.person.squareImage.slice(1)}"
                                alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">${person.person.name} <label for="my-modal-3" onclick="showDetails(${person.rank})"><i class="fa fa-eye cursor-pointer ml-2" aria-hidden="true"></i></label></div>
                    </div>
                </div>
            </td>
            <td>
                ${person.countryOfCitizenship}
            </td>
            <td>
            ${person.industries[0]}
            </td>
            <td>
            ${person.rank}
            </td>
            <th>
                $${person.finalWorth}
            </th>
        </tr>                        
        `
    }
}

const showDetails = (rank) => {
    let url = "./api/AllBillionaires.json"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let person = data.find(person => person.rank === rank)
            console.log(person);
            document.querySelector("#detailsCard").children[0].children[0].innerText = person.person.name
            document.querySelector("#detailsCard").children[0].children[2].innerText = person.bio ? person.bio : "No biography available"
            document.querySelector("#detailsCard").children[1].children[0].children[0].src = `${person.squareImage.slice(0, 6) === "https:" ? person.squareImage : "https:" + person.squareImage.slice(1)}`
            document.querySelector("#detailsCard").children[1].children[0].children[1].children[1].innerText = person.source
            document.querySelector("#generalInfo").innerHTML = `
            <p><b>Citizenship: </b>${person.countryOfCitizenship}</p>
            <p><b>State: </b>${person.state ? person.state : "No State Found"}</p>
            <p><b>City: </b>${person.city}</p>
            <p><b>Birthday: </b>${bday(person.birthDate)}</p>
            <p><b>Gender: </b>${person.gender}</p>
            `
            document.querySelector("#wealthInfo").innerHTML = `
            <p><b>Exchange: </b>${person.financialAssets[0].exchange}</p>
            <p><b>Ticker: </b>${person.financialAssets[0].ticker}</p>
            <p><b>Total Shares: </b>${person.financialAssets[0].numberOfShares}</p>
            <p><b>Share Price: </b>${person.financialAssets[0].sharePrice.toFixed(2)}</p>
            `
        })
}

const bday = day => {
    let date = new Date(day)
    return date.toDateString()
}