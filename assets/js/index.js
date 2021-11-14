const input = document.querySelector(".input")
const booksContainer = document.querySelector(".books")
const button = document.querySelector("button")


const getBooks = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}`)
        .then(res => res.json()).then(data => {
            let items = data.items
            console.log(items.length)
            const container = document.createElement('div')
            for (let i = 0; i < items.length; i++) {
                const div = document.createElement("div");
                console.log(items[i])
                div.innerHTML = `
                        
                        <h2>${items[i].volumeInfo.title}</h2> 
                        <a href="${items[i].volumeInfo.infoLink}" 
                        <div class="book-content">
                        <img src=${items[i].volumeInfo.imageLinks.smallThumbnail}>  
                        <div>
                            <p><strong>Authors:</strong> ${items[i].volumeInfo.authors.join(",")}</p>
                            <p><strong>Published:</strong> ${items[i].volumeInfo.publishedDate}</p>
                            <p><strong>Language:</strong> ${items[i].volumeInfo.language}</p>
                            <p>${items[i].volumeInfo.subtitle ? items[i].volumeInfo.subtitle : ''}</p>
                            </div>
                        </div>
                        </a>            
                `
                div.classList.add("book")
                container.appendChild(div)
                container.classList.add("books-container")
            }
            if (booksContainer.childNodes.length > 1) {
                booksContainer.replaceChild(container, booksContainer.childNodes[1])
            } else {
                booksContainer.appendChild(container)
            }
        })
}

button.addEventListener("click", () => {
    getBooks()
})
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getBooks()
    }
})