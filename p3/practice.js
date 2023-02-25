const countryDiv = document.getElementById("countryDiv")
const ld = document.getElementById("loading")
// const url = "https://restcountries.com/v3.1/all"

const country = (region) => {
    const regionUrl = `https://restcountries.com/v3.1/region/${region}`
    const countryUrl = `https://restcountries.com/v3.1/all`
    const type = region == "All" ? countryUrl : regionUrl
    fetch(type)
        .then(res => res.json())
        .then(countries => {
            for (const country of countries) {
                ld.classList.add("hidden")
                countryDiv.innerHTML += `
                <tr>
                <td>
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src=${country.flags.svg}
                                alt="Flag" />
                        </div>
                    </div>
                </td>
                <td>
                    <h2 class="font-bold">${country.name.common}</h2>
                </td>
                <td>
                    <h2 class="font-bold">${country.region}</h2>
                    </td>
                <td>
                    <h2 class="font-bold">${country.capital}</h2>
                </td>
                <td>
                    <h2 class="font-bold">${Object.values(country.languages) == "" ? "N/A" : Object.values(country.languages).slice(0, 2)
                    }</h2>
                </td>
            </tr>
                
                `

            }
        })
}
country()

document.getElementById("selector").addEventListener("change", (e) => {
    countryDiv.innerHTML = ""
    document.getElementById("selectorLang").innerHTML = ""
    country(e.target.value)
    getLanguage(e.target.value)
})
document.getElementById("selectorLang").addEventListener("change", (e) => {
    countryDiv.innerHTML = ""
    const langUrl = `https://restcountries.com/v3.1/lang/${e.target.value}`
    fetch(langUrl)
        .then(res => res.json())
        .then(countries => {
            for (const country of countries) {
                countryDiv.innerHTML += `
                    <tr>
                    <td>
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src=${country.flags.svg}
                                    alt="Flag" />
                            </div>
                        </div>
                    </td>
                    <td>
                        <h2 class="font-bold">${country.name.common}</h2>
                    </td>
                    <td>
                        <h2 class="font-bold">${country.region}</h2>
                        </td>
                    <td>
                        <h2 class="font-bold">${country.capital}</h2>
                    </td>
                    <td>
                        <h2 class="font-bold">${Object.values(country.languages) == "" ? "N/A" : Object.values(country.languages).slice(0, 2)
                    }</h2>
                    </td>
                </tr>
                    
                    `
            }
        })
})

const getLanguage = (param) => {
    const regionUrl = `https://restcountries.com/v3.1/region/${param}`
    const countryUrl = `https://restcountries.com/v3.1/all`
    const type = param == "All" ? countryUrl : regionUrl
    fetch(type)
        .then(res => res.json())
        .then(countries => {
            for (const country of countries) {
                const lan = Object.values(country.languages).slice(0, 1)
                // dont add duplicate language
                if (document.getElementById("selectorLang").innerHTML.includes(lan)) {
                    continue
                }
                document.getElementById("selectorLang").innerHTML += `
                <option value="${lan}">${lan}</option>
                `
            }
        })

}
country("All")