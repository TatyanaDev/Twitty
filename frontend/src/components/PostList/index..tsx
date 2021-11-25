import { useState, useEffect } from "react";
import PostDataService from "../../services/post.service";
import IPostData from "../../types/Post";

export default function PostList() {
  const initialPostState = {
    id: null,
    content: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const [posts, setPosts] = useState<IPostData>(initialPostState) as any;
  const [currentPost, setCurrentPost] = useState<null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    PostDataService.getPosts()
      .then((res: any) => {
        setPosts(res.data);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const createPost = (event: any) => {
    event.preventDefault();

    PostDataService.createPost({ content: event.target[0].value })
      .then(({ data }: any) => {
        setPosts({ data: [data.data, ...posts?.data] });
        event.target[0].value = "";
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const deletePost = ({ target }: any) => {
    PostDataService.deletePost(Number(target.id))
      .then(() => {
        setPosts({ data: posts.data.filter((post: any) => post.id !== Number(target.id)) });
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const setIdCurrentPost = ({ target }: any) => {
    setCurrentPost(target.id);
    setContent(target.value);
  };

  const savePost = ({ target }: any) => {
    setContent(target.value);
  };

  const updatePost = (event: any) => {
    event.preventDefault();

    posts.data.map((objPost: IPostData) => (objPost.id === Number(event.target.id) ? (objPost.content = event.target[0].value) : objPost));

    PostDataService.updatePost(Number(event.target.id), { content: event.target[0].value })
      .then(() => {
        setPosts({ data: posts.data });
        setCurrentPost(null);
        setContent("");
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <>
      <form onSubmit={createPost}>
        <input type='text' />
        <button type='submit'>Create</button>
      </form>
      <ul>
        {posts &&
          posts.data?.map((post: any) => (
            <li key={post.id}>
              {Number(currentPost) === post.id ? (
                <form id={post.id} onSubmit={updatePost}>
                  <textarea value={content ? content : ` ${post.content}`} onChange={savePost} />
                  <button id={post.id} type='submit'>
                    Save
                  </button>
                  <button id={post.id} onClick={deletePost}>
                    Delete
                  </button>
                </form>
              ) : (
                <>
                  {post.content}
                  <button id={post.id} onClick={setIdCurrentPost}>
                    Update
                  </button>
                  <button id={post.id} onClick={deletePost}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
