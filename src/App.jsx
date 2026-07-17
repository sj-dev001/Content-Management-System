import { useEffect, useState } from 'react';

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
    content: 'Use the form on the left to create a new article, update existing content, or delete entries.',
    author: 'Editor',
    category: 'Tips'
  }
];

function App() {
  const [posts, setPosts] = useState(() => {
    const stored = window.localStorage.getItem('cms-posts');
    return stored ? JSON.parse(stored) : starterPosts;
  });

  const [form, setForm] = useState({
    id: null,
    title: '',
    content: '',
    author: '',
    category: ''
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('cms-posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.content || !form.author || !form.category) {
      return;
    }

    if (editingId) {
      setPosts((current) => current.map((post) => (post.id === editingId ? { ...post, ...form } : post)));
    } else {
      const newPost = {
        id: Date.now(),
        ...form
      };
      setPosts((current) => [newPost, ...current]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({ id: null, title: '', content: '', author: '', category: '' });
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm(post);
  };

  const handleDelete = (id) => {
    setPosts((current) => current.filter((post) => post.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React CMS</p>
          <h1>Basic Content Management System</h1>
          <p>Create, edit, and manage content with a simple dashboard.</p>
        </div>
      </header>

      <main className="dashboard">
        <section className="panel form-panel">
          <h2>{editingId ? 'Edit article' : 'Create article'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Article title" />
            </label>
            <label>
              Content
              <textarea value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="Write your content here" rows="5" />
            </label>
            <label>
              Author
              <input value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} placeholder="Author name" />
            </label>
            <label>
              Category
              <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Category" />
            </label>
            <div className="actions">
              <button type="submit">{editingId ? 'Save changes' : 'Publish article'}</button>
              <button type="button" className="secondary" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </section>

        <section className="panel list-panel">
          <div className="panel-header">
            <h2>Published content</h2>
            <span>{posts.length} items</span>
          </div>

          <div className="post-list">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <div>
                  <p className="post-meta">{post.category} • {post.author}</p>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
                <div className="card-actions">
                  <button type="button" onClick={() => handleEdit(post)}>Edit</button>
                  <button type="button" className="secondary" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
