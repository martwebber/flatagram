// write your code here
const handleCommentSubmit = e => {
    e.preventDefault();
    let commentObj = {
      imageId:e.target.image.id,
      content:e.target.content.value,
    }
    console.log(commentObj)
    createComment(commentObj)
  }



const getImage = () =>{
    fetch('http://localhost:3000/images/1')
    .then(response => response.json())
    .then(result => addImageContent(result))
}

const addImageContent = imageObj => {
    let imageCard = `
    
    <div class="image-card">
        <h2 id="card-title" class="title">${imageObj.title}</h2>
        <img id="card-image" class="image" src="${imageObj.image}" alt="${imageObj.title}" />
        <div class="likes-section">
          <span id="like-count" class="likes">${imageObj.likes} likes</span>
          <button id="like-button" class="like-button">♥</button>
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
    
    const likeButton = document.querySelector('button#like-button')
    const likesCount = document.querySelector('span#like-count') 
    const commentsList = document.querySelector('ul#comments-list')
    imageObj.comments.forEach(comment =>{
      const li = document.createElement('li')
      li.textContent = comment.content
      console.log(li)
      commentsList.appendChild(li)
    })

    imageContainer.innerHTML = imageCard
    likeButton.addEventListener('click', (e) => {
        e.preventDefault();
    })
}

const createComment = (commentObj) => {
  fetch('http://localhost:3000/comments',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentObj)
  })
  .then(response => response.json())
  .then(comment => console.log(comment))
}

const init = document.addEventListener('DOMContentLoaded',(e) => {
    getImage()
    createComment()
    addImageContent()
})
init()