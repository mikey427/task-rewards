import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, CheckCircle, ShoppingBag } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No transactions yet</p>
              <p className="text-muted-foreground text-sm">Complete chores or make purchases to see your history</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item: HistoryItem) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-background to-muted/20 rounded-lg border border-muted hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      item.type === "chore" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {item.type === "chore" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <ShoppingBag className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${
                        item.type === "chore" 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.type === "chore" ? "+" : "-"}{item.amount} min
                    </span>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.type === "chore" ? "Earned" : "Spent"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
