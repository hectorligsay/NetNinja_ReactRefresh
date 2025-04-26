import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null); // initialize the blogs array
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  // fetch data on initial render
  // This will update our blogs useState
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
          console.log(err.name); // This is the name of the error (e.g., 'Error')
          console.log(err.stack); // This is the stack trace (useful for debugging)
        });
    }, 1000);
  }, []);

  return (
    <div className="home">
      {error && <div> {error} </div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
