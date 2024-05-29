import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Route does not exist!");
    navigate("/");
  }, [navigate]);

  return null;
};

export default NotFound;
