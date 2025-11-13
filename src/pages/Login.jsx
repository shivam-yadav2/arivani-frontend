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
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.traficoanalytica.com/api/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: formData.email,
        password: formData.password,
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Logged in Successfully");
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Login Failed");
      });
  };

  console.log(formData);
  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  type="email"
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <NavLink to="/">Sign up</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
