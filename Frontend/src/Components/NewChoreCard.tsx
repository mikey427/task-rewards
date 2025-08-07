import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type Props = {};

export default function NewChoreCard({}: Props) {
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

    if (response.ok) {
      toast.success("Chore has been created.");
      console.log(response);
      console.log({ chore, reward });
    }
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Create New Chore</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={CreateChore} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="chore"
                className="text-sm font-medium text-gray-700"
              >
                Chore
              </Label>
              <Input
                name="chore"
                id="chore"
                placeholder="Wash the dishes"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="reward"
                className="text-sm font-medium text-gray-700"
              >
                Reward for Completion (minutes)
              </Label>
              <Input
                name="reward"
                id="reward"
                placeholder="30"
                type="number"
                min="1"
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Chore
          </Button>
        </form>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      <Toaster richColors position="top-center" />
    </Card>
  );
}
