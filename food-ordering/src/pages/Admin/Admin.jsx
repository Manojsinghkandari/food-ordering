import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Admin.css";
import { Deletecontent, createContent } from "../../redux/slices/AdminSlice";
import { getAllContent } from "../../redux/slices/ContentSilce";
import CreatPostModal from "../../components/CreatPostModal";

function Admin() {
  const [id, setId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { Contents } = useSelector((state) => state.content);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = (e) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const token = userFromLocalStorage?.token;
    e.preventDefault();
    const contentObj = {
      name,
      price,
      description,
      category,
      img,
    };

    console.log(contentObj);
    dispatch(createContent({ contentObj, token }));
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImg(null);
  };

  useEffect(() => {
    dispatch(getAllContent());
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="containeerr">
        <div className="left">
          <h1 className="Product">Products</h1>
          <table className="table">
            <thead>
              <tr className="trTitle">
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Contents?.contents?.map((food) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={`http://localhost:3001${food.img}`}
                        style={{
                          width: "100%",
                          height: "10%",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td style={{ width: "50%" }}>{food.name}</td>
                    <td>{food.price}</td>
                    <td style={{ width: "50%" }}>
                      <button
                        className="button"
                        onClick={() => {
                          setId(food._id);
                          toggleModal();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          dispatch(
                            Deletecontent({
                              id: food._id,
                            })
                          );
                        }}
                        className="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="right" style={{ width: "50%" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="Product">Add Items</h1>
            </div>
            <div className="disc">
              <label className="textt">Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="area"
                type="text"
              />
            </div>

            <div className="disc">
              <label className="textt">Price</label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="area"
                type="text"
              />
            </div>

            <div className="disc">
              <label className="textt">Description</label>
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="area"
                type="text"
              />
            </div>

            <div className="disc">
              <label className="textt">Category</label>
              <input
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="area"
                type="text"
              />
            </div>

            <div className="disc">
              <label className="textt">Image</label>
              <input
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
                className="area"
                type="file"
              />
            </div>
            <button className="buttonn" style={{ width: "80%" }}>
              Add Item
            </button>
          </form>
        </div>
      </div>
      <CreatPostModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        id={id}
      />
    </>
  );
}

export default Admin;
