import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import conf from "../conf/conf.js";

import { Input } from "@/components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal.jsx";
function CreateTrip() {
  // ----------------------------
  // 1️⃣ ALL HOOKS MUST COME FIRST 
  // ----------------------------
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [formData, setFormData] = useState({});

  // Load Google Maps (must be BEFORE any return)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: conf.googlePlaceApiKey,
    libraries: ["places"],
  });

  // DEBUG (safe)
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // ----------------------------
  // 2️⃣ SINGLE EARLY RETURN ONLY
  // ----------------------------
  if (!isLoaded) {
    return <div>Loading Google Maps…</div>;
  }

  // ----------------------------
  // 3️⃣ FUNCTIONS (safe)
  // ----------------------------
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      console.log("Max days exceeded (5)");
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async() => {
    if (
      !formData.noOfDays ||
      !formData.location ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details.");
      console.log("Missing fields");
      return;
    }
    console.log(formData);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}",formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response.text());
  };

  // ----------------------------
  // 4️⃣ RENDER (SAFE)
  // ----------------------------
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
              const placeObj = placeAutocomplete.getPlace();
              handleInputChange("location", placeObj);
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
                  formData.traveler === t.people ? "shadow-lg border-black" : ""
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
        >
          Generate Trip
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
