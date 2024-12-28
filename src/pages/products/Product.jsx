import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fakeData } from "../../extras/fakeData";
import limited_img from "../../assets/limited.png";
import { ClipLoader } from "react-spinners";
import Paystack from "@paystack/inline-js";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [option, setOption] = useState({ size: "LG" });
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const [popUp, setPopUp] = useState(false);
  const [form_data, setForm_data] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const filterId = fakeData.filter((eachData) => {
      return eachData.unique_id === id;
    });
    setProduct(filterId);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAddedToCart(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addedToCart]);

  const handleBack = () => {
    navigate("/products");
  };

  const handleOptions = (e) => {
    e.preventDefault();
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const edit_form_data = (e) => {
    setForm_data((priv) => {
      return { ...priv, [e.target.name]: e.target.value };
    });
  };

  const pay_with_stacks = (e) => {
    e.preventDefault();
    const popup = new Paystack();

    popup.newTransaction({
      key: import.meta.env.VITE_PAY_PUBLIC_KEY,
      email: form_data.email,
      firstName: form_data.firstName,
      lastName: form_data.lastName,
      amount: 100 * 100,
      currency: "NGN",
      // currency: "USD", // ----- Currency not supported by merchant
      onSuccess: (response) => {
        console.log("OnSuccess: ", response?.reference);
        setPopUp((priv) => false);
        navigate("/transaction", {
          state: {
            userId: response?.reference,
          },
        });
      },
      onLoad: (response) => {
        console.log("OnLoad: ", response);
      },
      onCancel: (response) => {
        console.log("OnCancel: ", response);
        setPopUp((priv) => false);
      },
      onError: (error) => {
        console.log("Error: ", error);
        setPopUp((priv) => false);
      },
    });
  };

  return (
    <React.Fragment>
      <div className="relative">
        <div
          className={`absolute top-0 left-0 w-full h-full z-10 bg-slate-50 ${
            popUp === true ? "block" : "hidden"
          }`}
        >
          <div className="relative w-full h-full flex justify-center items-center">
            <div
              onClick={() => setPopUp((priv) => !priv)}
              className="absolute top-0 right-[1rem] text-[1.5rem] cursor-pointer"
            >
              x
            </div>
            <form onSubmit={pay_with_stacks} className="max-w-sm mx-auto">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={form_data.email}
                onChange={edit_form_data}
                required
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
              <label
                htmlFor="firstName"
                className="block my-2 text-sm font-medium text-gray-900"
              >
                Your first name
              </label>
              <input
                type="firstName"
                name="firstName"
                value={form_data.firstName}
                onChange={edit_form_data}
                required
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Adam"
              />
              <label
                htmlFor="lastName"
                className="block my-2 text-sm font-medium text-gray-900"
              >
                Your last name
              </label>
              <input
                type="lastName"
                name="lastName"
                value={form_data.lastName}
                onChange={edit_form_data}
                required
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Smith"
              />

              <div
                aria-describedby="helper-text-explanation"
                className="mt-5 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Smith"
              >
                $100
              </div>

              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                We’ll never share your details. Read our{" "}
                <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Privacy Policy
                </span>
                .
              </p>
              <button
                type="submit"
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <button
          onClick={handleBack}
          className=" font-black text-3xl px-5 text-white cursor-pointer"
        >
          ←
        </button>
        {product.length === 0 ? (
          <ClipLoader />
        ) : (
          product.map((product) => {
            return (
              <div
                key={product.unique_id}
                className=" md:grid md:grid-cols-2 relative flex flex-col items-center gap-5 bg-white m-1 rounded-md py-10 px-2 md:px-8"
              >
                <div
                  className={` bg-green-600 font-semibold px-5 py-1 uppercase text-white rounded-md fixed top-2 left-1 ${
                    addedToCart ? "translate-x-5" : "-translate-x-[700px]"
                  } transition-all`}
                >
                  <p>Item Added To Cart</p>
                </div>
                <section className=" ">
                  <img
                    src={product.img}
                    alt="NFT"
                    className={` size-72 lg:size-96 rounded-md`}
                  />
                </section>
                <section className=" w-full  flex flex-col gap-5">
                  <h2 className=" font-semibold text-3xl">{product.name}</h2>
                  <p className=" text-gray-900 font-semibold text-xl">
                    ${product.price}
                  </p>
                  <ul className=" border-b-[1px] pb-4 border-gray-600 text-gray-800 flex flex-col gap-1">
                    <li className=" flex gap-4 items-center  font-semibold text-[16px] ">
                      Limited Edition{" "}
                      <img
                        src={limited_img}
                        className=" size-8"
                        alt="Limited"
                      />
                    </li>
                    <li className=" text-lg uppercase font-semibold ">
                      Krypt Collection
                    </li>
                  </ul>

                  <article className=" bg-gray-100 px-2 pb-2 rounded font-medium text-lg">
                    {product.description}
                  </article>
                  <span className=" font-semibold text-sm">Size</span>
                  <select
                    onChange={handleOptions}
                    value={option.size}
                    name="size"
                    id=""
                    className=" bg-gray-200 rounded-full py-1 px-3 border-[1px] border-black"
                  >
                    <option value="LG">LG</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    {!product.img.includes("nft_product.jpg") && (
                      <option value="3XL">3XL</option>
                    )}
                  </select>
                  <button
                    onClick={() => setPopUp((priv) => !priv)}
                    className=" bg-black  text-white py-1 rounded-full font-medium font-mono"
                  >
                    Buy Now
                  </button>
                  <section className=" px-5 flex flex-col">
                    <span className=" font-semibold text-lg">
                      Buy your KRYPT NFT Collection Now!
                    </span>
                    <br />
                  </section>
                </section>
                <article className=" md:col-span-2">
                  The wait is over! You can now mint your limited edition KRYPT
                  NFT shirt collection on the Solana blockchain. With only 100
                  unique pieces available, don&apos;t miss your chance to own a
                  piece of digital fashion history. Once you select your NFT
                  shirt, press the Mint button to receive a unique digital asset
                  with: - Exclusive digital fashion Art. Randomized Gifts and
                  amazing Treasures will be assigned to your Token&apos;s
                  Address. Our lucky winners will be Notified immediately after
                  Minting an item in our collection. This is our way of saying
                  our customers are priority at the KRYPT brand. Join the KRYPT
                  community and be part of an ever-expanding universe of fashion
                  and art. Mint your NFT shirt now and unlock exclusive
                  experiences, prizes, and more
                </article>
              </div>
            );
          })
        )}
        <br />
      </div>
    </React.Fragment>
  );
}

export default Product;
