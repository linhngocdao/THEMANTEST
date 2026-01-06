import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost, getPosts } from "../../redux/slices/postSlice";

type Props = {};

const DetailPost = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const post = useSelector((state: any) => state.post.post);
  const listPost = useSelector((state: any) => state.post.posts);
  console.log("list post", listPost.Post);

  console.log(post);
  useEffect(() => {
    (async () => {
      await dispatch(getPost(id)).unwrap();
    })();
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(
      getPosts({
        page: 1,
        // limit: 3,
      })
    );
  }, [dispatch, 1]);
  return (
    <div className="w-10/12 m-auto py-5">
      <nav className="lg:relative top-[67px] lg:top-0 left-0 right-0 w-full lg:w-auto h-screen lg:h-full transition-transform duration-200">
        <ul className="flex font-semibold gap-5 lg:gap-0 pt-4 lg:pt-0 flex-col lg:flex-row w-[320px] lg:w-auto bg-white border lg:border-none border-r-gray-300 h-screen lg:h-full transition-transform duration-200">
          <li className="group block relative mx-1 mt-1 text-slate-200 hover:text-blue-400 transition duration-400 ease-in-out">
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li className=" block relative mx-1 mt-1 text-slate-200 duration-400">
            |
          </li>
          <li className=" block relative mx-1 mt-1 text-slate-200 transition duration-400">
            Bài viết
          </li>
          <li className=" block relative mx-1 mt-1 text-slate-200 duration-400">
            |
          </li>
          <li className=" block relative mx-1 mt-1 transition duration-400 w-[100px] truncate">
            {post.title}
          </li>
        </ul>
      </nav>
      <div className="content mt-5 grid grid-cols-3 gap-6  ">
        <div className="col-span-2">
          <img className="w-full" src={post.image} alt="" />
          <div>
            <h3 className="text-xl mt-5 font-semibold ">{post.desc}</h3>
            <p className="indent-5 mt-2 text-base">{post.content}</p>
          </div>
        </div>
        <div className="col-span-1 ">
          <h3 className="text-2xl pb-[10px]">Tin tức nổi bật</h3>
          <div className="h-[700px] overflow-y-auto">
          {listPost.Post.map((post: any) => (
            <Link
              to={`/detail/${post._id}/post`}
              key={post._id}
              className="grid gap-3 grid-cols-2 border-b-2 h-32 mt-4 "
            >
              <div className="h-4/6">
                <img className="max-w-full w-full h-28 object-cover " src={post.image} alt="" />
              </div>

              <div className="items-center h-4/6">
                <h3 className="font-semibold  sm:truncate lg:whitespace-normal h-4 overflow-hidden">
                  {post.title}
                </h3>
                <p className="font-medium sm:truncate lg:whitespace-normal h-20 overflow-hidden mt-2 ">
                     {post.descShort}
                    </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailPost;