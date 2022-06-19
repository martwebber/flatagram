// write your code here
const handleLike = e => {
    e.preventDefault();
    let imageObj = {
      title: e.target.title.value,
      image:e.target.image.value,
      likes:e.target.likes.value,
    }
  addlike(imageObj)                      
  }

const getImage = () =>{
    fetch('http://localhost:3000/images/1')
    .then(response => response.json())
    .then(result => addImageContent(result))
}

const addImageContent = imageObj => {
    // console.log(imageObj)
    let imageCard = `
    
    <div class="image-card">
        <h2 id="card-title" name="title' class="title">${imageObj.title}</h2>
        <img id="card-image" name="image" class="image" src="${imageObj.image}" alt="${imageObj.title}" />
        <div class="likes-section">
          <span id="like-count" class="likes">${imageObj.likes} likes</span>
          <button id="like-button" name="likes" class="like-button">♥</button>
        </div>
        <ul id="comments-list" class="comments">
          
        </ul>
        <form id="comment-form" class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
      </div>
    `

    const imageContainer = document.querySelector('div.image-container')
    const commentsList = document.querySelector('ul#comments-list')
    imageContainer.innerHTML = imageCard

    //add a like
    const likeButton = document.querySelector('button#like-button')
    likeButton.addEventListener('click', () => {
      imageObj.likes += 1
      addlike(imageObj)
      let likesCount = document.querySelector('span#like-count')
      likesCount.textContent = `${imageObj.likes} likes`

    })
}


const addlike = imageObj => {
  fetch('http://localhost:3000/images/1',{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(imageObj)
  })
  .then(response => response.json())
  .then(image  => image )
}

const init = document.addEventListener('DOMContentLoaded',(e) => {
    getImage()
})