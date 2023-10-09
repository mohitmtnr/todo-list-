import React from "react";
import moment from "moment";
import "./task.css";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import DeleteIcon from "@mui/icons-material/Delete";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios";
function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/task/removeTask/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({
        type: "REMOVE_TASK",
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkDone = (e) => {
    dispatch({
      type: "MARK_DONE",
      id,
    });
  };

  console.log(id);
  return (
    <div className="bg-purple-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className=" mx-3 checkbox w-5 h-5"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className=" italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={handleRemove}
          className=" mx-3 hover:scale-95  remove-task-btn bg-teal-500 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
