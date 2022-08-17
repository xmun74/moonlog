import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      id: new Date().getTime(),
      title,
      body,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetch(`http://localhost:3001/posts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([...posts, data]);
        navigate("/");
      });
  }

  return (
    <div className="create-post">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="제목을 입력하세요"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="태그를 입력하세요"
          type="text"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          placeholder="저자를 입력하세요"
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="내용을 적어보세요"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>등록</button>
      </form>
    </div>
  );
}
