person.result.map(person => {
    document.getElementById("person").innerHTML += `
    <div class="shadow-md rounded-lg overflow-hidden">
    <div class="bg-black/10 p-3 border-b-2 border-black">
    <h2>Person Name: ${person.name.common}</h2>
    </div>
    <div class="p-3">
    <h2 class="mb-2">Age: ${person.age} </h2>
    <p>Street: ${person.address.street}, House No: ${person.address.house}</p>
    </div>
    </div>`
})