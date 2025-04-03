import React from "react";
import { Navbar } from "@/components/common/Navbar";
import LoginForm from "@/components/authentication/LoginForm";
import { Footer } from "@/components/common/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
