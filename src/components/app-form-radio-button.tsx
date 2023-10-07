import * as RadioGroup from "@radix-ui/react-radio-group";

type AppFormRadioButtonWrapperProps = {} & RadioGroup.RadioGroupItemProps;

const AppFormRadioButtonWrapper = ({
  value,
  children,
}: AppFormRadioButtonWrapperProps) => {
  return (
    <RadioGroup.Item value={value}>
      <RadioGroup.Indicator />
      {children}
    </RadioGroup.Item>
  );
};

export default AppFormRadioButtonWrapper;
