import { Pagination } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SubBanner from "../../components/SubBanner";
import { getAllCatePosts, getCatePost } from "../../redux/slices/catePostSlice";
import { getPosts, setPage } from "../../redux/slices/postSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./FeaturedNews.module.css";
type Props = {};

const PostPage = (props: Props) => {
  const { id } = useParams();
  const post = useSelector((state: RootState) => state?.post);
  const pages = useSelector((state: RootState) => state?.post.page);
  const cateposts = useSelector((state: any) => state.catepost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCatePosts());
  }, [dispatch]);
  if (id) {
    useEffect(() => {
      dispatch(getCatePost(id));
    }, [dispatch]);
  } else {
    useEffect(() => {
      dispatch(
        getPosts({
          page: pages,
          limit: 12,
        })
      );
    }, [dispatch, pages]);
  }
  console.log(cateposts.cateposts);
  
  return (
    <div>
      <section className={styles.news}>
        {/* <SubBanner /> */}
        <div className={styles.news__title}>
          <h2>Blog của chúng tôi</h2>
        </div>
        <section className="grid grid-cols-4 grid-flow-row-dense gap-2">
          <div className="pl-9">
            <h2 className="text-2xl font-bold pb-6">Danh Mục Bài Viết</h2>
            <a href={`/post`}>
                  <h3 className="font-semibold  pb-2">Tất cả bài viết</h3>
                </a>
            {cateposts?.cateposts?.map((item: any, index: any) => {
              return (
                <a href={`/post/${item._id}`}>
                  <h3 className="font-semibold  pb-2">{item.name}</h3>
                </a>
              );
            })}
          </div>
          <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {post?.posts.Post?.map((e: any, index: any) => {
              return (
                <div key={index+1}>
                  <Link to={`/detail/${e._id}/post`}>
                    <div
                      className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
                      style={{
                        backgroundImage:
                          `url(${e.image})`
                      }}
                    >
                      <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="newspaper"
                          className="svg-inline--fa fa-newspaper "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Link>
                  <div className="bg-white rounded-b-xl shadow px-3 py-2">
                    <p className="text-sm text-gray-500"> {moment(e.createdAt).format("DD [tháng] MM, YYYY")}</p>
                    <h3>
                      <Link to={`/detail/${e._id}/post`}>
                        <span className="limit-line-2 block my-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black h-4 overflow-hidden">
                          {e.title}
                        </span>
                      </Link>
                    </h3>
                    <div className="limit-line-3 text-gray-500 text-sm text-justify whitespace-nowrap w-[210px] text-ellipsis overflow-hidden">
                     {e.descShort}
                    </div>
                    <button className="bg-gray-500 w-24 h-7 text-base mt-3 rounded-full text-stone-50 hover:bg-slate-300 hover:text-slate-700 "> <Link to={`/detail/${e._id}/post`}> Xem thêm</Link> </button>
                  </div>
                </div>
              );
            })}
             {cateposts?.catepost.news?.map((e: any, index: any) => {
              return (
                <div key={index+1}>
                  <Link to={`/detail/${e._id}/post`}>
                    <div
                      className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
                      style={{
                        backgroundImage:
                          `url(${e.image})`
                      }}
                    >
                      <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="newspaper"
                          className="svg-inline--fa fa-newspaper "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Link>
                  <div className="bg-white rounded-b-xl shadow px-3 py-2">
                    <p className="text-sm text-gray-500"> {moment(e.createdAt).format("DD [tháng] MM, YYYY")}</p>
                    <h3>
                      <Link to={`/detail/${e._id}/post`}>
                        <span className="limit-line-2 block my-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">
                          {e.title}
                        </span>
                      </Link>
                    </h3>
                    <div className="limit-line-3 text-gray-500 text-sm text-justify whitespace-nowrap w-[210px] text-ellipsis overflow-hidden">
                     {e.descShort}
                    </div>
                    <button className="bg-gray-500 w-24 h-7 text-base mt-4 rounded-full text-stone-50 hover:bg-slate-300 hover:text-slate-700 "> <Link to={`/detail/${e._id}/post`}> Xem thêm</Link> </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Pagination
          className={styles.a}
          defaultCurrent={1}
          total={post?.posts.count}
          pageSize={12}
          onChange={(pages) => {
            dispatch(setPage(pages));
          }}
        />
      </section>
    </div>
  );
};

export default PostPage;
