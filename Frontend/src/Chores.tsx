import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

type Props = {};

export default function Chores({}: Props) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuth();

  async function CreateChore(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const chore = formData.get("chore") as string;
    const reward = formData.get("reward") as string;

    const response = await fetch(`${apiUrl}/create-chore`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: chore,
        Description: "Default Description",
        RewardAmount: Number(reward),
      }),
    });

    console.log(response);
    console.log({ chore, reward });
  }

  return (
    <form onSubmit={CreateChore}>
      <div className="flex">
        <div className="flex flex-col">
          <Label htmlFor="chore">Chore</Label>
          <Input name="chore" id="chore" placeholder="Wash the dishes" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="reward">Reward for Completion</Label>
          <Input name="reward" id="reward" placeholder="0" type="number" />
        </div>
        <Button type="submit" variant="outline">
          Add Chore
        </Button>
      </div>
    </form>
  );
}
