import React from "react";
import {
  Card,
  //   CardAction,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import type { ShopItem } from "../lib/utils";

type Props = { onShopItemAdded: (newShopItem: ShopItem) => void };

export default function NewShopCard({ onShopItemAdded }: Props) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuth();

  async function CreateShopItem(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const item = formData.get("item") as string;
    const cost = formData.get("cost") as string;

    const response = await fetch(`${apiUrl}/create-shop-item`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: item,
        Description: "Default Description",
        Cost: Number(cost),
      }),
    });

    if (response.ok) {
      toast.success("Shop item has been created.");
      const data = await response.json();
      const newShopItem: ShopItem = data?.shopItem;
      onShopItemAdded(newShopItem);
    } else {
      const errorData = await response.json();
      toast.error(`Failed to create shop item: ${errorData.message}`);
    }
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Create New Shop Item</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={CreateShopItem} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="item"
                className="text-sm font-medium text-gray-700"
              >
                Item
              </Label>
              <Input
                name="item"
                id="item"
                placeholder="Video game time"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="reward"
                className="text-sm font-medium text-gray-700"
              >
                Description of Reward
              </Label>
              <Input name="description" id="description" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="cost"
                className="text-sm font-medium text-gray-700"
              >
                Cost (TimeTokens)
              </Label>
              <Input
                name="cost"
                id="cost"
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
            Add Shop Item
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
