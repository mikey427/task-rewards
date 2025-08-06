import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import type { Chore } from "../lib/utils";
type Props = {
  chores: Chore[];
};

export default function ChoreListCard({ chores }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {chores.length == 0 ? (
            <></>
          ) : (
            chores.map((chore, idx) => {
              return (
                <div key={idx} className="flex">
                  <div>{chore.Title}</div>
                  <div>{chore.Description}</div>
                  <div>{String(chore.RewardAmount)}</div>
                  <div></div>
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
  );
}
