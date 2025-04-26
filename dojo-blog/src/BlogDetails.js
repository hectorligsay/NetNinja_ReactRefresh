import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handleClick = async () => {
    setIsDeleting(true); // Sets deleting to true right away for the click
    try {
      const res = await fetch("http://localhost:8000/blogs/" + blog.id, {
        method: "DELETE",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

      if (!res.ok) {
        throw new Error("Not able to delete!!!");
      }

      console.log("Blog", blog.title, "by", blog.author, "has been deleted!");
      history.push("/");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
