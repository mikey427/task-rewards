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
import type { Chore } from "../lib/utils";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  chores: Chore[];
};

export default function ChoreListCard({ chores }: Props) {
  const [choresList, setChoresList] = useState<Chore[]>(chores);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "Confirmation" as "Confirmation" | "Warning" | "Error",
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setChoresList(chores);
  }, [chores]);

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

  const handleDelete = (choreId: string) => {
    openModal({
      type: "Confirmation",
      title: "Delete Chore",
      description: "Are you sure you want to delete this chore?",
      onConfirm: async () => {
        const res = await fetch(`${apiUrl}/delete-chore/${choreId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          console.error("Failed to delete chore");
          return;
        }

        setChoresList((prevChores) =>
          prevChores.filter((chore) => chore.ID !== choreId)
        );

        console.log(`Chore with ID ${choreId} deleted.`);
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
              Chore
            </label>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <label className="text-sm font-medium text-gray-700">Reward</label>
            <label className="text-sm font-medium text-gray-700">Actions</label>
          </div>
          <div className="flex flex-col">
            {choresList.length == 0 ? (
              <></>
            ) : (
              choresList.map((chore, idx) => {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-[2fr_4fr_1fr_1fr] gap-4 items-center m-1 h-8 border border-gray-300 rounded-2xl"
                  >
                    <span className="pl-5">{chore.Title}</span>
                    <span>{chore.Description}</span>
                    <span>{String(chore.RewardAmount)}</span>
                    {/* <span className="pr-5"></span> */}
                    <span className="flex pr-5">
                      <span>
                        <CheckLine className=" mr-5 h-4 w-4" />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDelete(chore.ID)}
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
