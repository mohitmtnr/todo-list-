import React, { useState } from "react";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";
function CreateTask() {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [toast, setToast] = useState();
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/task/addTask",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "ADD_TASK",
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="addContainer  md:w-1/2 md:mx-auto mx-3 mt-3 flex justify-center items-center">
      <div className="w-11/12">
        <form onSubmit={handleAdd}>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Write title of the to do..."
              required
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border-2 text-gray-600 text-sm rounded-lg focus:outline-none  block w-full p-2.5   placeholder-gray-600  focus:border-blue-500 "
            />
          </div>
          <div className="my-3">
            <textarea
              rows={5}
              name="description"
              id="description"
              placeholder="Write the description of the task..."
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
              className="border-2 text-gray-600 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5   placeholder-gray-600  "
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-teal-500 rounded-md text-white px-5 py-1 "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
