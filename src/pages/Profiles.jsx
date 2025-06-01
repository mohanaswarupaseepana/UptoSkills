import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Profiles.css';
import { loadPosts, savePosts } from "./postStorageUtils";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = loadPosts();
    if (saved && Array.isArray(saved)) {
      setPosts(saved);
    }
  }, []);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const postImage = reader.result || null;
      const newPost = {
        title,
        description,
        image: postImage,
        id: editingPost ? editingPost.id : Date.now(),
      };

      if (editingPost) {
        const updated = posts.map((post) =>
          post.id === editingPost.id ? newPost : post
        );
        setPosts(updated);
        setSuccessMessage("Post updated successfully!");
      } else {
        setPosts([newPost, ...posts]);
        setSuccessMessage("Post created successfully!");
      }

      setTitle("");
      setDescription("");
      setImage(null);
      setEditingPost(null);
      setShowModal(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      reader.onloadend();
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setImage(null);
    setShowModal(true);
  };
  const handleDeletePost = (id) => {
  const filteredPosts = posts.filter(post => post.id !== id);
  setPosts(filteredPosts);
  localStorage.setItem("posts", JSON.stringify(filteredPosts));
};

  return (
    <div className="create-post-container">
      <div className="create-post-launcher" onClick={() => setShowModal(true)}>
        <span className="plus-icon">+</span>
        <span>Create a Post</span>
      </div>

   <div className="post-list">
  <h3>Recent Posts</h3>
  {posts.length === 0 ? (
    <p>No posts created yet.</p>
  ) : (
    posts.map((post) => (
      <div key={post.id} className="post-card animate-fade-in">
        <h4>{post.title}</h4>
        <p>{post.description}</p>
        {post.image && <img src={post.image} alt="Post" className="post-image" />}
        <div className="button-group">
          <button className="edit-button" onClick={() => handleEdit(post)}>Edit</button>
          <button className="delete-button" onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      </div>
    ))
  )}
</div>




      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h2>{editingPost ? "Edit Post" : "Create a Post"}</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button type="submit">{editingPost ? "Update" : "Submit"}</button>
            </form>
          </div>
        </div>
      )}

      {successMessage && <p className="success-message animate-fade-in">{successMessage}</p>}
    </div>
  );
};

export default CreatePost;
