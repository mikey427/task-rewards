import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "Warning" | "Error" | "Confirmation";
  title: string;
  description: string;
};

export default function ConfirmationModal({
  isOpen,
  //   onClose,
  type,
  title,
  description,
}: Props) {
  return (
    <Dialog open={isOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className={`${type === "Warning" ? "bg-yellow-100" : ""} ${
          type === "Error" ? "bg-red-100" : ""
        } ${type === "Confirmation" ? "bg-green-100" : ""}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
