import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from '../components/button/button.component';
import { of } from 'rxjs';

export default {
  title: 'Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
      providers: [],
    }),
  ],
  tags: ['autodocs'],
} as Meta<ButtonComponent>;
const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
  template: `
  <black-pearl-button [text]="text" [class]="class" [shadow]="shadow" [disabled]="disabled"/>`,
});
export const WorkBack = Template.bind({});
WorkBack.args = {
  shadow: 'shadow-none',
  text: 'Ivan',
  disabled: of(false),
  class: 'bg-red-500',
};

WorkBack.argTypes = {
  shadow: {
    control: 'select',
    options: [
      'shadow-xs',
      'shadow-x',
      'shadow-sm',
      'shadow-m',
      'shadow-xl',
      'shadow-none',
    ],
    defaultValue: 'shadow-none',
  },
  class: {
    control: 'select',
    options: [
      '!bg-red-500',
      '!bg-blue-600',
      '!border-yellow-200',
      '!border-red-500',
    ],
    defaultValue: '!bg-red-500',
  },
};

const Parent: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});
export const WorkParent = Parent.bind({});
WorkParent.args = {
  shadow: 'shadow-none',
  text: 'Ivan',
  disabled: of(true),
  class: 'bg-red-500',
};

WorkParent.argTypes = {
  shadow: {
    control: 'select',
    options: [
      'shadow-xs',
      'shadow-x',
      'shadow-sm',
      'shadow-m',
      'shadow-xl',
      'shadow-none',
    ],
    defaultValue: 'shadow-none',
  },

  class: {
    control: 'select',
    options: [
      'bg-red-500',
      'bg-blue-600',
      'border-yellow-200',
      'border-red-500',
    ],
    defaultValue: 'bg-red-500',
  },
};
