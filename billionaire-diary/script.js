const username = document.getElementById("username"),
    allB = "./api/AllBillionaires.json",
    allByInd = "./api/ByIndustryTechnology.json",
    richest = "./api/Richest_People_API.json",
    showInTable = document.getElementById("showTable"),
    showInCard = document.getElementById("showCard");
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

const fetchData = async (type, cond, name) => {
    const response = await fetch(type);
    const data = await response.json();
    if (name === "industry") {
        showByIndustry(data, cond)
    } else if (name = "") {

    } else {
        showTopRich(data, cond, name)
    }
}
fetchData(richest)

//  Fetch details for Modal 
function showTopRich(data, all) {
    const sliceData = data.slice(0, 5)
    const conditionData = all ? data : sliceData
    document.getElementById("tableBody").innerHTML = ""
    const sortData = sortByNames(conditionData)
    if (!sortData) {
        for (const person of conditionData) {
            document.getElementById("tableBody").innerHTML += `
        
        <tr>
            <td class="break-words whitespace-normal">
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="${person.person.squareImage.slice(0, 6) === "https:" ? person.person.squareImage : "https:" + person.person.squareImage.slice(1)}"
                                alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold flex"><h2>${person.person.name}</h2> <label for="my-modal-3" onclick="showDetails(${person.rank})"><i class="fa fa-eye cursor-pointer ml-2" aria-hidden="true"></i></label></div>
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
                $<span>${person.finalWorth}</span>
            </th>
        </tr>                        
        `
        }
    } else {
        for (const person of conditionData) {
            document.getElementById("tableBody").innerHTML += `
            
            <tr>
                <td class="break-words whitespace-normal">
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src="${person.person.squareImage.slice(0, 6) === "https:" ? person.person.squareImage : "https:" + person.person.squareImage.slice(1)}"
                                    alt="Avatar" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold flex"><h2>${person.person.name}</h2> <label for="my-modal-3" onclick="showDetails(${person.rank})"><i class="fa fa-eye cursor-pointer ml-2" aria-hidden="true"></i></label></div>
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
                    $<span>${person.finalWorth}</span>
                </th>
            </tr>                        
            `
        }
    }
}

// find the person from allBillionaires api
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

// convert miliseconds to date
const bday = day => {
    let date = new Date(day)
    return date.toDateString()
}

// Show all billionaires
document.getElementById("allBillionaires").addEventListener("click", () => {
    showInTable.classList.remove("hidden");
    showInCard.classList.add("hidden");
    document.getElementById("tableBody").innerHTML = ""
    document.getElementById("tableBody").innerHTML = "Loading..."
    document.getElementById("allBillionaires").classList.add("hidden")
    document.getElementById("showTop5").classList.remove("hidden")
    fetchData(allB, true)
    startTotalCount()
})

//  Show top 5 richest again
document.getElementById("showTop5").addEventListener("click", () => {
    document.getElementById("tableBody").innerHTML = ""
    document.getElementById("tableBody").innerHTML = "Loading..."
    document.getElementById("allBillionaires").classList.remove("hidden")
    document.getElementById("showTop5").classList.add("hidden")
    fetchData(richest)
    startTotalCount()
})

// Search for a billionaire
document.getElementById("searchInput").addEventListener("keyup", (e) => {
    let search = e.target.value.toLowerCase()
    let table = document.getElementById("tableBody")
    let tr = table.getElementsByTagName("tr")
    for (const trElement of tr) {
        let td = trElement.getElementsByTagName("td")[0]
        if (td) {
            let textValue = td.textContent || td.innerText

            textValue.toLowerCase().indexOf(search) > -1 ? trElement.style.display = "" : trElement.style.display = "none"
            // how it works? ans: it returns the index of the search value in the textValue. if it is not found it returns -1. so if it is greater than -1 it means it is found. Example: textValue = "Hello World" search = "world" textValue.indexOf(search) = 6

        }
    }
})

//  Calculate total wealth
const totalWealth = () => {
    let sum = 0;
    let table = document.getElementById("tableBody")
    let tr = table.getElementsByTagName("tr")
    for (const rr of tr) {
        let td = rr.getElementsByTagName("th")[0].children[0].innerText
        if (td) {
            sum += parseFloat(td)
        }
    }
    document.getElementById("total").innerText = `${sum.toFixed(2)}`

}
//  Start total wealth calculation
const startTotalCount = () => {
    document.getElementById("total").innerText = "Calculating..."
    setTimeout(() => {
        totalWealth()
    }, 1000);
}
startTotalCount()

//  Sort by name
document.getElementById("sortByName").addEventListener("click", () => {
    sortByNames(sort)
})
const sortByNames = (data) => {
    let sortedData = data.sort((a, b) => a.person.name.localeCompare(b.person.name))
    return sortedData
}

//  Show by tech industry in card
const showByIndustry = (industry, cond) => {
    industry = cond ? industry.slice(0, 6) : industry
    for (const person of industry) {
        console.log(person);
        document.getElementById("showcraddetails").innerHTML += `
    <div class="mt-4 mx-3">
        <div>
            <h2 class="text-2xl font-bold uppercase pb-3 text-center">${person.person.name}</h2>
        </div>
        <div class="card card-side bg-base-100 gap-4 grid grid-cols-1 md:grid-cols-2 shadow-xl items-center">
            <div>
                <figure class="flex flex-col gap-y-1 text-xs">
                    <img src=${person.person.squareImage === "undefined" ? null : person.person.squareImage.slice(0, 6) === "https:" ? person.person.squareImage : "https:" + person.person.squareImage.slice(1)} />
                    <figcaption class="figure-caption"><b>Source: </b>${person.industries[0]}</figcaption>
                </figure>
            </div>
            <div class="card-body border-l-[1px] text-xs">
                <p><b>Citizenship: </b>${person.countryOfCitizenship}</p>
                <p><b>State: </b>${person.state ? person.state : "No State Found"}</p>
                <p><b>City: </b>${person.city}</p>
                <p><b>Total Shares: </b>$${person.financialAssets === "undefined" ? "Not Found" : person?.financialAssets?.numberOfShares  === "undefined" ? "Not Found" : person?.financialAssets?.numberOfShares}</p>
                <p><b>Share Price: </b>$${person.financialAssets === "undefined" ? "Not Found" : person?.financialAssets?.sharePrice === "undefined" ? "Not Found" : person?.financialAssets?.sharePrice}</p>
            </div>
        </div>
    </div>    
    `
    }

}

document.getElementById("showByIndustry").addEventListener("click", () => {
    showInTable.classList.add("hidden");
    showInCard.classList.remove("hidden");
    fetchData(allByInd, true, "industry")
})

const showAll = () => {
    document.getElementById("showcraddetails").innerHTML = ""
    fetchData(allByInd, false, "industry")
}