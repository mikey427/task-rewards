import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import NewChoreCard from "./components/NewChoreCard";
import type { Chore } from "./lib/utils";
import ChoreListCard from "./components/ChoreListCard";

type Props = {};

// interface Chore {
//   UserId: number;
//   Title: string;
//   Description: string;
//   RewardAmount: number;
// }

export default function Chores({}: Props) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [choreData, setChoreData] = useState<Chore[]>([]);
  const { user } = useAuth();

  async function fetchChoreData(): Promise<void> {
    const response = await fetch(`${apiUrl}/chores`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("Error retrieving chores");
      return;
    }

    const data = await response.json();
    setChoreData(data.chores || []);
    console.log("Chore data fetched.");
  }

  useEffect(() => {
    fetchChoreData();
  }, []);

  return (
    <div className="w-screen">
      <section className="flex">
        <div className="flex w-max h-full mx-auto mt-30">
          <NewChoreCard />
          <ChoreListCard chores={choreData} />
        </div>
      </section>
    </div>
  );
}
