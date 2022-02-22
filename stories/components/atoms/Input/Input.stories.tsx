import { ComponentStory, Meta } from "@storybook/react";
import Input, { InputProps } from "../../../../components/atoms/Input";

export default {
  title: "Components/Atoms/Input",
  component: Input,
} as Meta;

const Template: ComponentStory<typeof Input> = (args: InputProps) => (
  <Input {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Nama Lengkap",
};
