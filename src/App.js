import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Nav from "./components/Nav";
import PostDetail from "./components/PostDetail";
import Home from "./Home";

function App() {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => {
        // if (!res.ok) throw Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setIsPending(false);
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
        <Route
          exact
          path="/create"
          element={<CreatePost posts={posts} setPosts={setPosts} />}
        />
        <Route
          exact
          path="/posts/:id"
          element={<PostDetail data={posts} setData={setPosts} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
