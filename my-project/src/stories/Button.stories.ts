import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: { label: "Save" },
};

export const Disabled: Story = {
  args: { label: "Save", disabled: true },
};

export const NewButton: Story = {
  args: {
    label: "Save ",
    disabled: true
  }
};