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
import { Checkbox } from "@/components/ui/checkbox";
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
                <div>
                  <Label htmlFor="default-shop-item-cost">
                    Default Shop Item Cost
                  </Label>
                  <Input id="default-shop-item-cost" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="confirm-before-purchase">
                    Confirm Before Purchase
                  </Label>
                  <Checkbox
                    id="confirm-before-purchase"
                    defaultChecked={user?.UserSettings?.ConfirmBeforePurchase}
                  />
                </div>
              </TabsContent>
              <TabsContent value="finance">
                <div>
                  <Label htmlFor="debt-enabled">Enable Debt</Label>
                  <Checkbox
                    id="debt-enabled"
                    defaultChecked={user?.UserSettings?.DebtEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="max-debt">Max Debt</Label>
                  <Input id="max-debt" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="interest-enabled">Enable Interest</Label>
                  <Checkbox
                    id="interest-enabled"
                    defaultChecked={user?.UserSettings?.InterestEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="interest-percent">Interest Rate</Label>
                  <Input id="interest-percent" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="display-bankruptcy">Display Bankruptcy</Label>
                  <Checkbox
                    id="display-bankruptcy"
                    defaultChecked={user?.UserSettings?.DisplayBankruptcy}
                  />
                </div>
                <div>
                  <Label htmlFor="bankruptcy-cooldown-days">
                    Bankruptcy Cooldown (Days)
                  </Label>
                  <Input id="bankruptcy-cooldown-days" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="probation-enabled">Enable Probation</Label>
                  <Checkbox
                    id="probation-enabled"
                    defaultChecked={user?.UserSettings?.ProbationEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="probation-duration-days">
                    Probation Duration (Days)
                  </Label>
                  <Input id="probation-duration-days" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="confirm-before-debt">
                    Confirm Before Debt
                  </Label>
                  <Checkbox
                    id="confirm-before-debt"
                    defaultChecked={user?.UserSettings?.ConfirmBeforeDebt}
                  />
                </div>
              </TabsContent>
              <TabsContent value="gamification">
                <div>
                  <Label htmlFor="leveling-enabled">Enable Leveling</Label>
                  <Checkbox
                    id="leveling-enabled"
                    defaultChecked={user?.UserSettings?.LevelingEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="level-decay-enabled">
                    Enable Level Decay
                  </Label>
                  <Checkbox
                    id="level-decay-enabled"
                    defaultChecked={user?.UserSettings?.LevelDecayEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="level-decay-per-day">
                    Level Decay (Per Day)
                  </Label>
                  <Input id="level-decay-per-day" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="streak-bonus-multiplier-enabled">
                    Enable Streak Bonus Multiplier
                  </Label>
                  <Checkbox
                    id="streak-bonus-multiplier-enabled"
                    defaultChecked={
                      user?.UserSettings?.StreakBonusMultiplierEnabled
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="achievements-enabled">
                    Enable Achievements
                  </Label>
                  <Checkbox
                    id="achievements-enabled"
                    defaultChecked={user?.UserSettings?.AchievementEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="leaderboard-enabled">
                    Enable Leaderboard
                  </Label>
                  <Checkbox
                    id="leaderboard-enabled"
                    defaultChecked={user?.UserSettings?.LeaderboardEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="show-completion-animations">
                    Show Completion Animations
                  </Label>
                  <Checkbox
                    id="show-completion-animations"
                    defaultChecked={
                      user?.UserSettings?.ShowCompletionAnimations
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="notifications">
                <div>
                  <Label htmlFor="streak-notifications-enabled">
                    Streak Notifications
                  </Label>
                  <Checkbox
                    id="streak-notifications-enabled"
                    defaultChecked={
                      user?.UserSettings?.StreakBonusMultiplierEnabled
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="weekly-reports-enabled">
                    Enable Weekly Reports
                  </Label>
                  <Checkbox
                    id="weekly-reports-enabled"
                    defaultChecked={user?.UserSettings?.WeeklyReports}
                  />
                </div>
              </TabsContent>
              <TabsContent value="advanced">
                <div>
                  <Label htmlFor="analytics-enabled">Enable Analytics</Label>
                  <Checkbox
                    id="analytics-enabled"
                    defaultChecked={user?.UserSettings?.AnalyticsEnabled}
                  />
                </div>
                <div>
                  <Label htmlFor="enable-family">Enable Family Mode</Label>
                  <Checkbox
                    id="enable-family"
                    defaultChecked={user?.UserSettings?.FamilyEnabled}
                  />
                </div>
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
