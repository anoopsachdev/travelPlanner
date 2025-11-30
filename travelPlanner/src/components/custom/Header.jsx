import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom'; // 1. Import Link
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b">
      {/* 2. & 3. Logo and Text wrapped in Link for redirection */}
      <Link to={'/'} className='flex items-center gap-3 cursor-pointer'>
        <img src="/logo.svg" alt="TripMate logo" className="h-10 w-auto" />
        <h2 className='font-bold text-2xl text-[#f56551]'>TripMate</h2>
      </Link>
      {/* <div>
        <Button className="bg-black text-white hover:bg-gray-800">Sign in</Button>
      </div> */}
      {user ? (
        <div className="flex items-cetner gap-x-3">
          <Link to="/my-trip">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </Link>
          <Popover>
            <PopoverTrigger>
              <img className="h-10 w-10 rounded-full" src={user?.picture} />
            </PopoverTrigger>
            <PopoverContent>
              <Button
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
                className="rounded-2xl border-2 p-2 cursor-pointer"
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
      )}
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-3">
              <img src="/logo.svg" className="h-10 w-10" alt="TripMate Logo" />
              <span className="font-bold text-xl mt-1">TripMate</span>
            </div>
            <DialogTitle className="font-bold text-lg text-center">
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-center">
              Please sign in to the App with Google authentication securely.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-5 mt-4">
            <Button className="w-full mt-5 gap-2" onClick={() => login()}>
              <FcGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header