import ReactModal from "react-modal";
import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UpdateContent } from "../redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
ReactModal.setAppElement("#react-modal");

function CreatPostModal({ isModalOpen, toggleModal, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#E5E4E2",
    },
  };

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
    dispatch(UpdateContent({ id: id, updateddata: contentObj }));
    toggleModal();
  };
  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
      >
        <div className="w-fit ms-auto">
          <button onClick={toggleModal} className="text-4xl text-red-500">
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div>
          <h1 className="text-center font-medium text-2xl capitalize">
            Edit Content
          </h1>
          <form onSubmit={handleSubmit}>
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
            <button className="buttonn" style={{ width: "100%" }}>
              Edit Item
            </button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
}

export default CreatPostModal;
