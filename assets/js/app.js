let choice
let animationImg
let stillImg
let count
let toggle = false

const grabGif = (event) => {
  document.querySelector('#images').innerHTML = ''
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=odl72x6HQSRA89hfBYHw6bAAsReFxb4O&q=${choice}&limit=${count}&offset=0&rating=G&lang=en`)
    .then(r => r.json())
    .then(r => {
      for (let i = 0; i < count; i++) {
        animationImg = r.data[i].images.fixed_height.url
        stillImg = r.data[i].images.fixed_height_still.url
        console.log(animationImg)
        let newDiv = document.createElement('span')
        newDiv.innerHTML = `<img class="gif" src="${stillImg}" alt="${choice}" data-still="${stillImg}" data-animated="${animationImg}">`
        document.querySelector('#images').append(newDiv)
        document.querySelector('#count').value = ''
        document.querySelector('#search').value = ''
      }
    })
}
const logSearch = () => {
  let newDiv = document.createElement('button')
  newDiv.innerHTML = `${choice}`
  newDiv.className = 'loggedSearch'
  document.querySelector('#logSearch').append(newDiv)
}

document.addEventListener('click', event => {
  if (event.target.id === 'sButton') {
    count = document.querySelector('#count').value
    choice = document.querySelector('#search').value
    grabGif()
    logSearch()
  } else if (event.target.className === 'loggedSearch') {
    choice = event.srcElement.innerHTML
    grabGif()
  } else if (event.target.className === 'gif') {
    toggle = !toggle
    let { still, animated } = event.target.dataset
    if (toggle) {
      event.target.setAttribute('src', animated)
    } else {
      event.target.setAttribute('src', still)
    }
  }
})
