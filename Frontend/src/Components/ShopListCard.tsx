import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckLine, Trash } from "lucide-react";

import React, { useState, useEffect } from "react";
import type { ShopItem } from "../lib/utils";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  shopItems: ShopItem[];
};

export default function ShopListCard({ shopItems }: Props) {
  const [shopItemsList, setShopItemsList] = useState<ShopItem[]>(shopItems);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "Confirmation" as "Confirmation" | "Warning" | "Error",
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setShopItemsList(shopItems);
  }, [shopItems]);

  const openModal = (config: {
    type: "Warning" | "Error" | "Confirmation";
    title: string;
    description: string;
    onConfirm: () => void;
  }) => {
    setModalState({
      ...config,
      isOpen: true,
    });
  };

  const handleDelete = (shopItemId: string) => {
    openModal({
      type: "Confirmation",
      title: "Delete Shop Item",
      description: "Are you sure you want to delete this shop item?",
      onConfirm: async () => {
        const res = await fetch(`${apiUrl}/delete-shop-item/${shopItemId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          console.error("Failed to delete shop item");
          return;
        }

        setShopItemsList((prevItems) =>
          prevItems.filter((item) => item.ID !== shopItemId)
        );

        console.log(`Shop item with ID ${shopItemId} deleted.`);
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <div className="m-6 w-2/3">
      <Card className="">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[2fr_4fr_1fr_1fr] gap-4 items-center">
            <label className="pl-5 text-sm font-medium text-gray-700">
              Item
            </label>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <label className="text-sm font-medium text-gray-700">Cost</label>
            <label className="text-sm font-medium text-gray-700">Actions</label>
          </div>
          <div className="flex flex-col">
            {shopItemsList.length == 0 ? (
              <></>
            ) : (
              shopItemsList.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-[2fr_4fr_1fr_1fr] gap-4 items-center m-1 h-8 border border-gray-300 rounded-2xl"
                  >
                    <span className="pl-5">{item.Title}</span>
                    <span>{item.Description}</span>
                    <span>{String(item.Cost)}</span>
                    {/* <span className="pr-5"></span> */}
                    <span className="flex pr-5">
                      <span>
                        <CheckLine className=" mr-5 h-4 w-4" />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.ID)}
                      >
                        <Trash className="h-4 w-4" />
                      </span>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalState.onConfirm}
        type={modalState.type}
        title={modalState.title}
        description={modalState.description}
      />
    </div>
  );
}