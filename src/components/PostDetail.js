import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../util/useFetch";

export default function PostDetail({ data, setData }) {
  const navigate = useNavigate();
  const [like, setLike] = useState(true);
  const { id } = useParams();

  const { posts, setPosts, isPending, error } = useFetch(
    `http://localhost:3001/posts/${id}`
  );
  // console.log(posts);

  function handleDelete() {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const deleted = data.filter((el) => String(el.id) !== id);
        setData(deleted);
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="post-detail">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {posts && (
        <article>
          <h1>{posts.title}</h1>
          <div className="detail-wrapper">
            <div className="wrapper-left">
              <div
                className="wrapper-left-author"
                style={{ fontWeight: "bold" }}
              >
                {posts.author}
              </div>
              <div>· &nbsp; {posts.createdAt.slice(0, 10)}</div>
            </div>
            <div className="wrapper-right">
              <button>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          </div>
          <div>{posts.body}</div>
        </article>
      )}
    </div>
  );
}
