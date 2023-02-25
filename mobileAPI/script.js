const phoneDiv = document.getElementById("phoneDiv");
const loader = document.getElementById("loader");
const showAll = document.getElementById("show");
const searchInput = document.getElementById("searchInput")
const loadPhone = async (search, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, limit)
}

const displayPhone = async (phones, limit) => {
    if (limit && phones.length > 10) {
        phones = phones.slice(0, 3)
        showAll.classList.remove("hidden")
    }
    else {
        showAll.classList.add("hidden")

    }
    if (phones.length === 0) {
        phoneDiv.innerHTML = "No phone found"
        toggleSpinner(false)
    }

    for (const phone of phones) {
        phoneDiv.innerHTML += `
            <div class="card card-compact w-96 bg-base-100 shadow-black/40 pt-5 shadow">
                <figure><img class="rounded-xl" src=${phone.image} alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <label for="my-modal-3" class="btn btn-primary" onclick="showDetails('${phone.slug}')">Show Details</label>
                    </div>
                </div>
            </div>
            `
        toggleSpinner(false)
    }
}

const processSearch = (limit) => {
    toggleSpinner(true)
    phoneDiv.innerHTML = ""
    loader.classList.remove("hidden")
    loadPhone(searchInput.value, limit)
}

document.getElementById("searchBtn").addEventListener("enter", function () {
    processSearch(10)
})
searchInput.addEventListener("keypress", e => { if (e.key == "Enter") processSearch(10) })
document.getElementById("searchBtn").addEventListener("enter", function () {
    processSearch(10)
})
document.getElementById("showAll").addEventListener("click", function () {
    processSearch()
})

const toggleSpinner = isLoading => {
    isLoading ? loader.classList.remove("hidden") : loader.classList.add("hidden")
}
const showDetails = async (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
    document.getElementById("modalDetail").innerHTML = `
    <div class="modal-box relative">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold" id="phoneId">${data.data.name}</h3>
            <img src=${data.data.image} alt="">
            <p class="py-4">Brand: ${data.data.brand}</p>
            <p class="py-4">Chipset: ${data.data.mainFeatures.chipSet}</p>
            <p class="py-4">Storage: ${data.data.mainFeatures.storage}</p>
        </div>
    
    `
}
loadPhone("apple", 10)