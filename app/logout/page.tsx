"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

function LogoutPage() {
  const { setAuthStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    appwriteService.logout().then(() => {
      setAuthStatus(false);
      router.replace("/");
    });
  });

  return <div></div>;
}

export default LogoutPage;
