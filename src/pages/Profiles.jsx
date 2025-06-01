import React, { useState, useEffect } from "react";
import "./Profiles.css";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    mediaFile: null,
    mediaURL: "",
    mediaType: "", // 'image' or 'video'
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts to localStorage (excluding media files)
  const savePosts = (posts) => {
    const safePosts = posts.map(({ mediaFile, ...rest }) => rest);
    localStorage.setItem("posts", JSON.stringify(safePosts));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // No size limit now, so no checks here

    const fileType = file.type.startsWith("video") ? "video" : "image";
    const previewURL = URL.createObjectURL(file);

    setNewPost((prev) => ({
      ...prev,
      mediaFile: file,
      mediaURL: previewURL,
      mediaType: fileType,
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!newPost.title || !newPost.description) {
      alert("Title and description are required.");
      return;
    }

    const postToAdd = {
      id: Date.now(),
      title: newPost.title,
      description: newPost.description,
      mediaURL: newPost.mediaURL,
      mediaType: newPost.mediaType,
    };

    const updatedPosts = [postToAdd, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);

    setNewPost({
      title: "",
      description: "",
      mediaFile: null,
      mediaURL: "",
      mediaType: "",
    });
    setModalOpen(false);
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter((post) => post.id !== confirmDeleteId);
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setConfirmDeleteId(null);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="create-post-container">
      <div className="create-post-launcher" onClick={() => setModalOpen(true)}>
        <span className="plus-icon">+</span> Create a Post
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="post-list">
        <h3>Recent Posts</h3>
        {filteredPosts.length === 0 && (
          <p className="no-posts-msg">
            {posts.length === 0 ? "No posts yet." : "No results found."}
          </p>
        )}

        {filteredPosts.map((post) => (
          <div
            className="post-card"
            key={post.id}
            onClick={() => {
              setSelectedPost(post);
              setDetailModalOpen(true);
            }}
          >
            <h4>{post.title}</h4>
            <p>{post.description}</p>

            {post.mediaURL && post.mediaType === "image" && (
              <img src={post.mediaURL} alt="post" className="post-image" />
            )}

            {post.mediaURL && post.mediaType === "video" && (
              <video controls className="post-image" style={{ maxHeight: "300px" }}>
                <source src={post.mediaURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="button-group">
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent modal open
                  setConfirmDeleteId(post.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form className="create-post-form" onSubmit={handleCreatePost}>
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                rows={4}
                value={newPost.description}
                onChange={(e) =>
                  setNewPost({ ...newPost, description: e.target.value })
                }
                required
              ></textarea>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />

              {newPost.mediaURL && newPost.mediaType === "image" && (
                <img
                  src={newPost.mediaURL}
                  alt="preview"
                  className="preview-image"
                />
              )}

              {newPost.mediaURL && newPost.mediaType === "video" && (
                <video
                  controls
                  className="preview-image"
                  style={{ maxHeight: "400px" }}
                >
                  <source src={newPost.mediaURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Post
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {detailModalOpen && selectedPost && (
        <div className="modal-overlay" onClick={() => setDetailModalOpen(false)}>
          <div
            className="modal-content post-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Post Details</h2>
            <div className="post-detail-item">
              <strong>Title:</strong> <span>{selectedPost.title}</span>
            </div>
            <div className="post-detail-item">
              <strong>Post:</strong> <p>{selectedPost.description}</p>
            </div>
            <div className="post-detail-item">
              <strong>Media:</strong>
              <div className="media-preview">
                {selectedPost.mediaURL && selectedPost.mediaType === "image" && (
                  <img
                    src={selectedPost.mediaURL}
                    alt="media"
                    className="post-image"
                  />
                )}
                {selectedPost.mediaURL && selectedPost.mediaType === "video" && (
                  <video controls className="post-image" style={{ maxHeight: "400px" }}>
                    <source src={selectedPost.mediaURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {!selectedPost.mediaURL && <p>No media attached.</p>}
              </div>
            </div>

            <button
              className="close-detail-button"
              onClick={() => setDetailModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDeleteId && (
        <div className="modal-overlay" onClick={() => setConfirmDeleteId(null)}>
          <div
            className="modal-content delete-confirmation"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this post?</p>
            <div className="confirmation-buttons">
              <button className="delete-confirm-button" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="cancel-confirm-button"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;