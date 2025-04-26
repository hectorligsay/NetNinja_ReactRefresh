import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null); // initialize the blogs array
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // fetch data on initial render
  // This will update our blogs useState
  useEffect(() => {
    // abort controller to cleanup the useEffect
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          // we need to recognize error for abort to take effect
          // we don't want it to update the state
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
            console.log(err.name); // This is the name of the error (e.g., 'Error')
            console.log(err.stack); // This is the stack trace (useful for debugging)
          }
        });
    }, 1000);
    // clean up function
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
