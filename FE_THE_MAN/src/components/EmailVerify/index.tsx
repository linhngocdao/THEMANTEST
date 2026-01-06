import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8000/verify/${param.id}`;
        const { data } = await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white">
              <div
                className="modal-container items-start"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/assignmentjs/image/upload/v1665903246/img/success_fwdnt3.png"
                    alt="success"
                    className="w-40"
                  />
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900 pt-5"
                    id="modal-title"
                  >
                    Xác thực thành công !
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Cảm ơn bạn đã xác thực vui lòng đăng nhập để tiếp tục sử
                      dụng !
                    </p>
                  </div>
                  <Link to="/signin">
                    <button className="mt-8 rounded-3xl bg-blue-500 py-3 px-8 text-white font-semibold hover:bg-blue-400 ease-in-out transition-all ">
                      Trở về đăng nhập
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default EmailVerify;
