import React from "react";

interface DashboardCardProps {
  small?: boolean;
  img?: React.JSX.Element;
  title: string;
  description: string;
}

const MAX_TITLE_CHARS = 20;
const MAX_DESCRIPTION_CHARS = 50;
const CARD_PLACEHOLDER = {
  image: <div className="h-full w-full bg-red-300"></div>,
  title: "Title",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consequuntur aspernatur beatae expedita ut. Doloremque odit, esse quaerat accusamus dicta rem dolor quo animi harum, numquam optio veritatis quae corrupti?",
};

const defaultCardLayout = (
  img: React.JSX.Element,
  displayTitle: string,
  displayDescription: string
) => {
  return (
    <section className="flex w-[200px] min-w-[200px] flex-col gap-12 rounded-[18px] bg-tertiary p-12 pb-16 lg:w-[240px] lg:min-w-[240px] lg:gap-16 lg:p-16 lg:pb-24">
      <div className="aspect-square h-auto w-full">{img}</div>
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold uppercase text-body">
          {displayTitle}
        </p>
        <p className="text-sm font-medium text-gray">{displayDescription}</p>
      </div>
    </section>
  );
};

const smallCardLayout = (
  img: React.JSX.Element,
  displayTitle: string,
  displayDescription: string
) => {
  return (
    <section className="flex w-full flex-row items-center gap-12 overflow-hidden rounded-md bg-tertiary lg:w-[240px] lg:min-w-[240px] lg:flex-col lg:gap-16 lg:rounded-[18px] lg:p-16 lg:pb-24">
      <div className="aspect-square h-[60px] w-[60px] lg:h-auto lg:w-full">
        {img}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold uppercase text-body">
          {displayTitle}
        </p>
        <p className="hidden text-sm font-medium text-gray lg:block">
          {displayDescription}
        </p>
      </div>
    </section>
  );
};

const DashboardCard = ({
  small = false,
  img = CARD_PLACEHOLDER.image,
  title = CARD_PLACEHOLDER.title,
  description = CARD_PLACEHOLDER.description,
}: DashboardCardProps) => {
  const displayTitle =
    title.length > MAX_TITLE_CHARS
      ? `${title.substring(0, MAX_TITLE_CHARS)}...`
      : title;

  const displayDescription =
    description.length > MAX_DESCRIPTION_CHARS
      ? `${description.substring(0, MAX_DESCRIPTION_CHARS)}...`
      : description;

  return small
    ? smallCardLayout(img, displayTitle, displayDescription)
    : defaultCardLayout(img, displayTitle, displayDescription);
};
DashboardCard.displayName = "Card";

export { DashboardCard };
