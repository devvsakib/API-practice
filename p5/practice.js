const adId = document.getElementById("adId")
const advice = document.getElementById("advice")
const newAdvice = document.getElementById("newAdvice")
// const url = "https://api.quotable.io/random"

console.log();

const genNewAdvice = () => {
    const url = "https://api.adviceslip.com/advice"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // adId.innerText = data._id
            // advice.innerText = data.content
            console.log(data.slip);

        })
}
genNewAdvice()
newAdvice.addEventListener("click",  genNewAdvice)