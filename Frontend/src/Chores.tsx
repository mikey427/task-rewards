import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import NewChoreCard from "./components/NewChoreCard";

type Props = {};

export default function Chores({}: Props) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuth();

  async function fetchChoreData(): Promise<void> {}

  return (
    <div className="w-screen">
      <section className="flex">
        <div className="w-max h-full mx-auto mt-30">
          <NewChoreCard />
        </div>
        <div className="flex flex-col"></div>
      </section>
    </div>
  );
}
