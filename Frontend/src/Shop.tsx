import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import NewShopCard from "./components/NewShopCard";
import type { ShopItem } from "./lib/utils";
import ShopListCard from "./components/ShopListCard";

type Props = {};

export default function Shop({}: Props) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [shopData, setShopData] = useState<ShopItem[]>([]);

  const { user } = useAuth();

  async function fetchShopData(): Promise<void> {
    const response = await fetch(`${apiUrl}/shop`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("Error retrieving shop items");
      return;
    }

    const data = await response.json();
    setShopData(data.shopItems || []);
    console.log(data.shopItems);
    console.log("Shop data fetched.");
  }

  const updateShopData = (newShopItem: ShopItem) => {
    setShopData((prevItems) => [...prevItems, newShopItem]);
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  return (
    <div className="w-screen h-screen">
      <section className="flex">
        <div className="flex w-full h-full mx-auto mt-30">
          <NewShopCard onShopItemAdded={updateShopData} />
          <ShopListCard shopItems={shopData} />
        </div>
      </section>
    </div>
  );
}