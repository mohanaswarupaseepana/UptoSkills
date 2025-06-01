// Utility for localStorage operations
export const loadPosts = () => {
  const saved = localStorage.getItem("posts");
  return saved ? JSON.parse(saved) : [];
};

export const savePosts = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};
