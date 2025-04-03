
import React from "react";
import Navbar from "@/components/common/Navbar";
import RegisterForm from "@/components/authentication/RegisterForm";
import Footer from "@/components/common/Footer";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
