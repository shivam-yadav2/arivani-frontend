import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MyContext from "../context/MyContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(MyContext);
  console.log(user);

  const [alltasks, setAlltasks] = useState();

  const getAlltasks = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.traficoanalytica.com/api/tasks/get-task",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // toast.success("Task Fetched Successfully");
        console.log(response);
        setAlltasks(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Task Fetching Failed");
      });
  };

  const navigate = useNavigate();

   const deleteTask = async (id) => {
    console.log(id)
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.traficoanalytica.com/api/tasks/delete-task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Task Deleted Successfully");
        console.log(response);
        getAlltasks()
        // setAlltasks(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Task Deleting Failed");
      });
  };

  useEffect(() => {
    getAlltasks();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Task Dashboard {user?.name}</CardTitle>
            <NavLink
              to="/create"
              className="bg-black text-white text-xl px-2 py-1 rounded "
            >
              Create Task
            </NavLink>
            <Button onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();

            }}>Logout</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your Tasks.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alltasks &&
                  alltasks.map((item, index) => {
                    return (
                      <TableRow key={index}>  
                        <TableCell className="font-medium">{index+1}</TableCell>
                        <TableCell>{item?.title}</TableCell>
                        <TableCell>{item?.description}</TableCell>
                        <TableCell>{item?.status}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-6">
                            {/* <NavLink
                              className="cursor-pointer bg-blue-300 px-2 py-1 rounded"
                              variant="link"
                            >
                              View
                            </NavLink> */}
                            <NavLink
                                to={`/update/${item?._id}`} 
                              className="cursor-pointer bg-yellow-300 px-2 py-1 rounded"
                              variant="link"
                            >
                              Edit
                            </NavLink>
                            <NavLink
                              onClick={() => deleteTask(item?._id)}
                              variant="link"
                              className="text-red-600 bg-red-300 px-2 py-1 rounded cursor-pointer"
                            >
                              Delete
                            </NavLink>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
