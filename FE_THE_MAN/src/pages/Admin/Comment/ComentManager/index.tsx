import { useEffect, useState } from "react";
import { getPosts } from "../../../../redux/slices/postSlice";
import { useAppDispatch } from "../../../../redux/store";
import "../../../../styleAntd/panigation.css";
import styles from "../../Products/ProductManager/ProductManager.module.css";
import { Modal, Pagination, message } from "antd";
import {
  filterCommnets,
  getAllcomment,
  removeComemnt,
} from "../../../../api-cilent/User";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

const CommetManager = () => {
  const [data, setData] = useState<any>();
  const [pages, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!search) {
        await getData();
      } else {
        await onSubmit();
      }
    })();
  }, [pages]);

  const getData = async () => {
    const { data } = await getAllcomment(pages, 10);
    setData(data);
  };

  const handremove = (id: any) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      content: "Không thể hoàn tác sau khi xóa",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      async onOk() {
        await removeComemnt(id);
        await getData();
        message.success("Xóa thành công!");
        dispatch(
          getPosts({
            page: pages,
            limit: 10,
          })
        );
      },
    });
  };

  const onSubmit = async () => {
    const { data } = await filterCommnets(search, pages, 10);
    setData(data);
  };

  return (
    <div className={styles.content}>
      <header>
        <form onSubmit={(e) => e.preventDefault()} className="inline-flex">
          <div className="pr-4">
            <input
              className="pl-4 border-2 border-gray-400 border-solid min-w-[250px] py-[6px] rounded-xl"
              placeholder="Nhập nội dung"
              type="text"
              value={search}
              onChange={(e: any) => {
                setSearch(e?.target?.value);
              }}
              id=""
            />
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center px-6 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A303B] hover:bg-[#4D535E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D535E]"
          >
            Tìm kiếm
          </button>
        </form>
      </header>
      <main className="flex flex-col justify-between ">
        <table>
          <thead>
            <tr>
              <td>STT</td>
              <td>Tài Khoản</td>
              <td>Sản phẩm</td>
              <td>Nội dung</td>
              <td>Thời gian bình luận</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody>
            {data?.Comments?.map((e: any, index: any) => {
              const date = moment(e.createdAt).format("DD-MM-YYYY hh:mm:ss");
              return (
                <tr key={index}>
                  <td>{(pages - 1) * 10 + ++index}</td>
                  <td>{e.user?.email}</td>
                  <td>{e.product?.name}</td>
                  <td>{e.content}</td>
                  <td>{date}</td>
                  <td className={styles.action}>
                    <AiOutlineDelete
                      onClick={() => handremove(e._id)}
                      className={styles.delete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          defaultCurrent={1}
          total={data?.count}
          pageSize={10}
          onChange={(pages) => {
            setPage(pages);
          }}
        />
      </main>
    </div>
  );
};

export default CommetManager;
