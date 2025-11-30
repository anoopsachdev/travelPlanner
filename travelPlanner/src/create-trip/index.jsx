import React, { useState, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import conf from "../conf/conf.js";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { Input } from "@/components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig.jsx";
import { useNavigate } from "react-router-dom";
function CreateTrip() {
  // 1️⃣ ALL HOOKS MUST BE AT THE TOP LEVEL
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: conf.googlePlaceApiKey,
    libraries: ["places"],
  });

  // Define login hook HERE, before any returns
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  // DEBUG (safe)
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // 2️⃣ HELPER FUNCTIONS
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

   const SaveAiTrip = async (TripData) => {
     setLoading(true);
     const user = JSON.parse(localStorage.getItem("user"));
     const docId = Date.now().toString();
     await setDoc(doc(db, "AITrips", docId), {
       userChoice: formData,
       tripData: JSON.parse(TripData),
       userEmail: user?.email,
       id: docId,
     });
     navigate("/view-trip/" + docId);
   };

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      console.log("Max days exceeded (5)");
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData.noOfDays ||
      !formData.location ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replaceAll("{location}", formData?.location?.label || formData?.location?.address)
      .replaceAll("{totalDays}", formData?.noOfDays)
      .replaceAll("{traveler}", formData?.traveler)
      .replaceAll("{budget}", formData?.budget);

    try {
      console.log("Sending prompt to AI...", FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("Generated Text:", result.response.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("🚨 AI Generation Error:", error);
      toast("AI Error: Check console for details");
    }
  };

  // 3️⃣ CONDITIONAL RENDER (Only after all hooks are declared)
  if (!isLoaded) {
    return <div>Loading Google Maps…</div>;
  }

  // 4️⃣ MAIN RENDER
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences🌴🏕️
      </h2>

      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information…
      </p>

      <div className="mt-20 flex flex-col gap-9">
        {/* DESTINATION */}
        <div>
          <h2 className="text-xl my-3 font-medium">Destination</h2>
          <Autocomplete
            onLoad={(ac) => setPlaceAutocomplete(ac)}
            onPlaceChanged={() => {
              const place = placeAutocomplete.getPlace();
              
              // ❌ OLD CODE (Caused the crash):
              // handleInputChange("location", place);

              // ✅ NEW CODE (Fixes the crash):
              handleInputChange("location", {
                label: place.name,
                address: place.formatted_address,
                lat: place.geometry.location.lat(), // Extract the number
                lng: place.geometry.location.lng()  // Extract the number
              });
            }}
          >
            <Input placeholder="Search destination" />
          </Autocomplete>
        </div>

        {/* DAYS */}
        <div>
          <h2 className="text-xl my-3 font-medium">Days</h2>
          <Input
            placeholder="Example: 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* BUDGET */}
        <div>
          <h2 className="text-xl my-3 font-medium">Budget</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((b, i) => (
              <div
                key={i}
                onClick={() => handleInputChange("budget", b.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData.budget === b.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-3xl">{b.icon}</h2>
                <h2 className="font-bold text-lg">{b.title}</h2>
                <h2 className="text-sm text-gray-500">{b.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* TRAVELERS */}
        <div>
          <h2 className="text-xl my-3 font-medium">Traveling With</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((t, i) => (
              <div
                key={i}
                onClick={() => handleInputChange("traveler", t.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData.traveler === t.people
                    ? "shadow-lg border-black"
                    : ""
                }`}
              >
                <h2 className="text-3xl">{t.icon}</h2>
                <h2 className="font-bold text-lg">{t.title}</h2>
                <h2 className="text-sm text-gray-500">{t.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="my-10 justify-end flex">
        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={OnGenerateTrip}
          disabled={loading}
        >
          {loading ? "Generating Trip..." : "Generate Trip"}
        </Button>
      </div>

      {/* DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
            <Button
              className="w-full mt-5 gap-2"
              onClick={() => login()}
            >
              <FcGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;