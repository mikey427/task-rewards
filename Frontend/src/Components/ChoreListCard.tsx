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

import React from "react";
import type { Chore } from "../lib/utils";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  chores: Chore[];
};

export default function ChoreListCard({ chores }: Props) {
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
            {chores.length == 0 ? (
              <></>
            ) : (
              chores.map((chore, idx) => {
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
                      <span>
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
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        type="Confirmation"
        title="Confirm Action"
        description="Are you sure you want to perform this action?"
      />
    </div>
  );
}

// const [modalState, setModalState] = useState({
//   isOpen: false,
//   type: "Confirmation" as const,
//   title: "",
//   description: "",
//   onConfirm: () => {},
// });

// // Function to open modal with custom content
// const openModal = (config: {
//   type: "Confirmation" | "Delete" | etc;
//   title: string;
//   description: string;
//   onConfirm: () => void;
// }) => {
//   setModalState({
//     ...config,
//     isOpen: true,
//   });
// };

// // Usage example for delete action
// const handleDelete = (choreId: string) => {
//   openModal({
//     type: "Delete",
//     title: "Delete Chore",
//     description: "Are you sure you want to delete this chore?",
//     onConfirm: () => {
//       // Delete logic here
//       setModalState((prev) => ({ ...prev, isOpen: false }));
//     },
//   });
// };
