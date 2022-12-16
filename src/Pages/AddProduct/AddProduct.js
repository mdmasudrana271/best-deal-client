import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import { AuthContext } from "../../context/AuthProvider";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, isLoading } = useContext(AuthContext);

  const imageHostKey = process.env.REACT_APP_IMGBB_API_KEY;

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            name: data.product,
            image: imgData.data.url,
            price: data.price,
            location: data.location,
            description: data.description,
            category: data.category,
            email: user.email,
          };

          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem(
                "bookAccessToken"
              )}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Add Product Successfully");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="p-6">
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow-2xl ng-untouched ng-pristine ng-valid"
      >
        <h2 className="w-full text-3xl font-bold leading-tight">Add Product</h2>
        <div>
          <label className="block mb-1 ml-1 text-black">Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            {...register("product", { required: "Product name is required" })}
            className="block w-full p-2  rounded focus:outline-none focus:ring focus:ring-opacity-25 input  input-bordered"
          />
          {errors.product && (
            <p role="alert" className="text-error">
              {errors.product?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 ml-1 text-black">Category</label>
          <input
            type="text"
            placeholder="Product Category"
            {...register("category", {
              required: "Product category is required",
            })}
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 input  input-bordered"
          />
          {errors.category && (
            <p role="alert" className="text-error">
              {errors.category?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 ml-1 text-black">Price</label>
          <input
            type="text"
            placeholder="$"
            {...register("price", {
              required: "Product category is required",
            })}
            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 input  input-bordered"
          />
          {errors.price && (
            <p role="alert" className="text-error">
              {errors.price?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("image", { required: "image is required" })}
            type="file"
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p role="alert" className="text-error">
              {errors.image?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 ml-1 text-black">Description</label>
          <textarea
            type="text"
            placeholder="Description"
            className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 input  input-bordered"
            {...register("description", {required: "description is required",})}
          ></textarea>
          {errors.description && (
            <p role="alert" className="text-error">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-info w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring "
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
