import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  // set states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  // object to go back/forth through history
  // and to redirect the user
  const history = useHistory();

  // function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    try {
      const res = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      await new Promise((resolve) => setTimeout(resolve, 2)); // 2 second delay

      if (!res.ok) {
        throw new Error("Could not add the blog!");
      }

      console.log("Blog successfully added!");
      setIsPending(false);
      // history.go(-1); // lets you go back in history
      history.push("/"); // use history to route
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
