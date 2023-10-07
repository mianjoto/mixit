"use client";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { Apps } from "@/types/apps";
import { DashboardContentShelf } from "@/components/dashboard-content-shelf";
import AppFormRadioButtonWrapper from "../../../components/app-form-radio-button";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AppFormCard } from "@/components/app-form-card";

export default function Shuffler() {
  return (
    <>
      <AppDashboardHeading app={Apps.Shuffler} />
      <DashboardContentShelf headingText="What would you like to shuffle?">
        <RadioGroup.Root>
          <AppFormRadioButtonWrapper value={"Hello"}>
            <AppFormCard.LikedSongs app={Apps.Shuffler} />
          </AppFormRadioButtonWrapper>
        </RadioGroup.Root>
      </DashboardContentShelf>
    </>
  );
}
