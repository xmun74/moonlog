import { Link } from "react-router-dom";

export default function Home({ posts }) {
  return (
    <div className="post-list">
      {posts &&
        posts.map((post) => (
          // const { id, title, body, author, createdAt, updatedAt } = posts;
          <div className="post-info" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <div>{post.body.substr(0, 150)}</div>
            <div className="post-subinfo">
              <div>{post.createdAt.toLocaleString().slice(0, 10)}</div>
              <div>0개의 댓글</div>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="grey"
                  d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                ></path>
              </svg>
              <div>비공개</div>
            </div>
          </div>
        ))}
    </div>
  );
}
