import React, { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

type HistoryItem = {
  id: string;
  name: string;
  amount: number;
  type: "chore" | "purchase";
  timestamp: string; // ISO date string
};

export default function History({}: Props) {
  const [history, setHistory] = React.useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`${apiUrl}/history`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setHistory(data.history);
    };
    fetchHistory();
  }, []);

  return (
    <Card className="w-3/4 mx-auto mt-10">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <div className="space-y-2">
          {history.map((item: HistoryItem) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex justify-between items-center p-3 bg-muted/50 rounded-md border"
            >
              <span className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </span>
              <span className="font-medium text-sm">{item.name}</span>
              <span
                className={`text-sm font-semibold ${
                  item.type == "chore" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.type == "chore" ? "+ " : "- "}
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
