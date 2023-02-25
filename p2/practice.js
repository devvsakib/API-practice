data.map(car => {
    document.getElementById("cards").innerHTML += `

<div class="card card-compact w-96 bg-base-100 shadow-xl shadow-white/10">
<figure><img src=${car.imageURL} alt="Shoes" /></figure>
<div class="card-body">
    <h2 class="card-title">${car.name}</h2>
    <p>${car.description}</p>
    <div class="card-actions justify-end">
        <button class="btn btn-primary">Price: ${car.price}</button>
    </div>
</div>
</div>

`
})