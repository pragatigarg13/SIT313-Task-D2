import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortablePost({
  post,
  expandedPost,
  setExpandedPost,
  hidePost,
  getPostDate
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="post-card"
    >
      <button
        type="button"
        className="drag-button"
        {...attributes}
        {...listeners}
      >
        Drag to reorder
      </button>

      <h3>{post.title}</h3>

      <p>Type: {post.postType}</p>

      <p>Plan: {post.plan}</p>

      <p>Date: {getPostDate(post)}</p>

      <p>Tags: {(post.tags || []).join(", ")}</p>

      {post.postType === "Article" && (
        <p>Abstract: {post.abstract}</p>
      )}

      <p>
        {expandedPost === post.id
          ? post.description
          : `${post.description.substring(0, 120)}${post.description.length > 120 ? "..." : ""}`}
      </p>

      <button
        onClick={() =>
          setExpandedPost(
            expandedPost === post.id ? null : post.id
          )
        }
      >
        {expandedPost === post.id ? "Show Less" : "Read More"}
      </button>

      <button onClick={() => hidePost(post.id)}>
        Hide Post
      </button>
    </div>
  );
}

export default SortablePost;
