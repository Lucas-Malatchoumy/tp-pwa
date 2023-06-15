
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const postsPerPage = 10;
let currentPage = 1;

// Fonction pour récupérer et afficher les posts correspondants à la page actuelle
function fetchPosts() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      let postsContainer = document.querySelector('#posts');
      postsContainer.innerHTML = '';

      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const postsToDisplay = data.slice(startIndex, endIndex);

      postsToDisplay.forEach((post) => {
        const card = `
          <div class="card w-50 mx-auto my-3">
            <div class="card-header">
              <h2>${post.title}</h2>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${post.body}</p>
              </blockquote>
            </div>
            <div class="card-footer text-center">
        <a href="post.html?id=${post.id}" class="btn btn-primary">Voir plus</a>
      </div>
          </div>
        `;

        postsContainer.innerHTML += card;
      });

      // Pagination
      const totalPages = Math.ceil(data.length / postsPerPage);
      let paginationContainer = document.querySelector('#pagination');

      // Clear the existing pagination
      paginationContainer.innerHTML = '';

      let stringifiedData = JSON.stringify(data);
    localStorage.setItem('posts', stringifiedData);

      // Generate pagination links
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.textContent = i;

        // Highlight the current page
        if (i === currentPage) {
          pageLink.classList.add('active');
        }

        // Handle page link click event
        pageLink.addEventListener('click', (event) => {
          event.preventDefault(); // Empêche le comportement par défaut du lien
          currentPage = i;
          fetchPosts(); // Appeler la fonction fetchPosts() pour mettre à jour les posts affichés
        });

        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.appendChild(pageLink);

        paginationContainer.appendChild(pageItem);
      }
    });
}

// Appel initial pour afficher les posts de la première page
fetchPosts();
