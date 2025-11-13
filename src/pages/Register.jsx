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
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.traficoanalytica.com/api/users/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Registered Successfully");
        navigate("/login");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Registration Failed");
      });
  };

  console.log(formData);

  //  const navigate = useNavigate()
   useEffect(() => {
     
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }else{
        navigate('/dashboard')
      }
    }, []);
  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  id="email"
                  type="email"
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
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <input
                  className="rounded border p-1 px-3"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  id="confirm-password"
                  type="password"
                  required
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit">Create Account</Button>

                  <FieldDescription className="px-6 text-center">
                    Already have an account?{" "}
                    <NavLink to="/login">Sign in</NavLink>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
