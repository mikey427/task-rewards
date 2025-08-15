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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DropDown from "./components/DropDown";
import { useAuth } from "./contexts/AuthContext";

type Props = {};

export default function Settings({}: Props) {
  const { user, loading } = useAuth();

  return (
    <div className="w-3/4">
      Settings
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <div>
            <Tabs defaultValue="general" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="finance">Debt & Finance</TabsTrigger>
                <TabsTrigger value="gamification">Gamification</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="theme">
                    Theme (Current: {`${user?.UserSettings?.Theme}`})
                  </Label>
                  <DropDown
                    options={[
                      { value: "light", label: "Light" },
                      { value: "dark", label: "Dark" },
                    ]}
                    onValueChange={(value) => console.log(value)}
                    placeholder="Select a theme"
                  />
                </div>
                <div>
                  <Label htmlFor="language">
                    Language (Current: {`${user?.UserSettings?.Language}`})
                  </Label>
                  <DropDown
                    id="language"
                    options={[
                      { value: "en", label: "English" },
                      { value: "es", label: "Spanish" },
                    ]}
                    onValueChange={(value) => console.log(value)}
                    placeholder="Select a language"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency Name</Label>
                  <Input id="currency" />
                </div>
                <div>
                  <Label htmlFor="default-chore-reward">
                    Default Chore Reward
                  </Label>
                  <Input id="default-chore-reward" placeholder="0" />
                </div>
              </TabsContent>
              <TabsContent value="finance">
                Change your financial settings here.
              </TabsContent>
              <TabsContent value="gamification">
                Change your gamification settings here.
              </TabsContent>
              <TabsContent value="notifications">
                Change your notification settings here.
              </TabsContent>
              <TabsContent value="advanced">
                Change your advanced settings here.
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
