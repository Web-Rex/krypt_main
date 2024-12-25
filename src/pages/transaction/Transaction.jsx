import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);

  const init_checkout_details = async (ref) => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_PAY_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    await axios
      .get(`https://api.paystack.co/transaction/verify/${ref}`, {
        headers: headers,
      })
      .then(async (response) => {
        console.log("RESPONSE RECEIVED: ", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err.message);
      });
  };

  useEffect(() => {
    console.log(location?.state?.userId);
    if (!location?.state?.userId) navigate("/");

    init_checkout_details(location?.state?.userId);

    return () => {};
  }, []);

  return (
    <React.Fragment>
      <div className="bg-white flex justify-center items-center p-10">
        <div className="bg-gray-50 w-full h-full flex justify-center items-center">
          <div className="w-full h-full p-10">
            <h1 className="text-[2rem] mb-5">Transaction Details</h1>

            <div className="">
              <div className="_title_">first_name</div>
              <div className="_sub_title_">
                {data?.data?.customer?.first_name || "...."}
              </div>
            </div>

            <div className="">
              <div className="_title_">last_name</div>
              <div className="_sub_title_">
                {data?.data?.customer?.last_name || "...."}
              </div>
            </div>

            <div className="">
              <div className="_title_">email</div>
              <div className="_sub_title_">
                {data?.data?.customer?.email || "...."}
              </div>
            </div>

            <div className="">
              <div className="_title_">transaction date</div>
              <div className="_sub_title_">
                {data?.data?.transaction_date || "...."}
              </div>
            </div>

            <div className="">
              <div className="_title_">currency</div>
              <div className="_sub_title_">{data?.data?.currency || "...."}</div>
            </div>

            <div className="">
              <div className="_title_">payment status</div>
              <div className="_sub_title_">{data?.data?.status || "...."}</div>
            </div>

            <div className="">
              <div className="_title_">amount</div>
              <div className="_sub_title_">{data?.data?.amount || "...."}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Transaction;
