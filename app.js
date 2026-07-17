const starterPosts = [
  {
    id: 1,
    title: 'Welcome to your CMS',
    content: 'This starter content shows how your basic content management system can store and display articles.',
    author: 'Admin',
    category: 'General'
  },
  {
    id: 2,
    title: 'Publish your first update',
    content: 'Use the form to create a new article or keep the starter entries.',
    author: 'Editor',
    category: 'Tips'
  }
];

const app = document.getElementById('app');
const storedPosts = JSON.parse(localStorage.getItem('cms-posts') || 'null');
const initialPosts = storedPosts || starterPosts;

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Static CMS</p>
          <h1>Basic Content Management System</h1>
          <p>Create, edit, and manage content with a simple dashboard.</p>
        </div>
      </header>

      <main class="dashboard">
        <section class="panel form-panel">
          <h2>Create article</h2>
          <form id="post-form">
            <label>
              Title
              <input name="title" placeholder="Article title" required />
            </label>
            <label>
              Content
              <textarea name="content" placeholder="Write your content here" rows="5" required></textarea>
            </label>
            <label>
              Author
              <input name="author" placeholder="Author name" required />
            </label>
            <label>
              Category
              <input name="category" placeholder="Category" required />
            </label>
            <div class="actions">
              <button type="submit">Publish article</button>
            </div>
          </form>
        </section>

        <section class="panel list-panel">
          <div class="panel-header">
            <h2>Published content</h2>
            <span>${initialPosts.length} items</span>
          </div>
          <div class="post-list">
            ${initialPosts.map((post) => `
              <article class="post-card">
                <div>
                  <p class="post-meta">${post.category} • ${post.author}</p>
                  <h3>${post.title}</h3>
                  <p>${post.content}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
    </div>
  `;
}

render();

app.querySelector('#post-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newPost = {
    id: Date.now(),
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
    category: formData.get('category')
  };

  initialPosts.unshift(newPost);
  localStorage.setItem('cms-posts', JSON.stringify(initialPosts));
  render();
});
