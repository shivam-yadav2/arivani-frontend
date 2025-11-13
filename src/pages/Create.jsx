import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.traficoanalytica.com/api/tasks/create-task",
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
        toast.success("Task Created Successfully");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Task Creation Failed");
      });
  };



  console.log(formData);
  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create a Task</CardTitle>
          <CardDescription>
            Enter your information below to create your task
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
                  placeholder="Task Description"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>

                <select
                  className="rounded border p-1 px-3"

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
                  <Button type="submit">Create Task</Button>

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

export default Create;
