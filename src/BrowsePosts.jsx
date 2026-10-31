import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import SortablePost from "./SortablePost";
import "./BrowsePosts.css";

function BrowsePosts() {
  const [posts, setPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [postType, setPostType] = useState("All");
  const [plan, setPlan] = useState("All");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/posts", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load posts.");
      }

      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function hidePost(id) {
    setHiddenPosts((previousPosts) => [...previousPosts, id]);
  }

  function resetFilters() {
    setPostType("All");
    setPlan("All");
    setTag("");
    setDate("");
    setHiddenPosts([]);
    setExpandedPost(null);
  }

  function getPostDate(post) {
    const timestamp = post.createdAt?._seconds || post.createdAt?.seconds;

    if (!timestamp) return "";

    const postDate = new Date(timestamp * 1000);

    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, "0");
    const day = String(postDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const filteredPosts = posts.filter((post) => {
    const matchesType =
      postType === "All" || post.postType === postType;

    const matchesPlan =
      plan === "All" || post.plan === plan;

    const matchesTag =
      tag === "" ||
      (post.tags || []).some((item) =>
        item.toLowerCase().includes(tag.toLowerCase())
      );

    const matchesDate =
      date === "" || getPostDate(post) === date;

    return (
      matchesType &&
      matchesPlan &&
      matchesTag &&
      matchesDate &&
      !hiddenPosts.includes(post.id)
    );
  });

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filteredPosts.findIndex(
      (post) => post.id === active.id
    );

    const newIndex = filteredPosts.findIndex(
      (post) => post.id === over.id
    );

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedPosts = arrayMove(
      filteredPosts,
      oldIndex,
      newIndex
    );

    let index = 0;

    const updatedPosts = posts.map((post) => {
      if (filteredPosts.some((item) => item.id === post.id)) {
        return reorderedPosts[index++];
      }

      return post;
    });

    setPosts(updatedPosts);
  }

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="browse-posts">
      <h2>Browse Posts</h2>

      <div className="filters">
        <label>Post Type:</label>

        <select
          value={postType}
          onChange={(event) => setPostType(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Question">Questions</option>
          <option value="Article">Articles</option>
        </select>

        <label>Plan:</label>

        <select
          value={plan}
          onChange={(event) => setPlan(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>

        <label>Search by Tag:</label>

        <input
          type="text"
          placeholder="Enter a tag"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />

        <label>Search by Date:</label>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <button onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <h3>Available Posts</h3>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredPosts.map((post) => post.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredPosts.map((post) => (
              <SortablePost
                key={post.id}
                post={post}
                expandedPost={expandedPost}
                setExpandedPost={setExpandedPost}
                hidePost={hidePost}
                getPostDate={getPostDate}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default BrowsePosts;
