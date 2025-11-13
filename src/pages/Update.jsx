import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Update = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
    const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { user } = useContext(MyContext);
  console.log(user);

  const getTask = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.traficoanalytica.com/api/tasks/get-task/${id}`,
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
        setFormData({
            title: response.data.task.title,
            description: response.data.task.description,
            status: response.data.task.status
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Task Fetching Failed");
      });
  };

  useEffect(()=>{
    getTask()
  },[])

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://test.traficoanalytica.com/api/tasks/edit-task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        title: formData.title,
        description: formData.description,
        status: formData.status,
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Task Updated Successfully");
        console.log(response);
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Task Updating Failed");
      });
  };



  console.log(formData);
  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update a Task</CardTitle>
          <CardDescription>
            Enter your information below to update your task
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  id="title"
                  type="text"
                  value={formData.title}
                  placeholder="Task Title"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  id="description"
                  type="text"
                  value={formData.description}

                  placeholder="Task Description"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>

                <select
                  className="rounded border p-1 px-3"
                  value={formData.status}

                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  name="status"
                  id="status"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </Field>

              <FieldGroup>
                <Field>
                  <Button type="submit">Update Task</Button>

                  <NavLink to="/dashboard">
                    <Button>Go Back</Button>
                  </NavLink>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Update;
