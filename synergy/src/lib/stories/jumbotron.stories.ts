import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { JumbotronComponent } from '../components/jumbotron/jumbotron.component';

export default {
  title: 'Jumbotron',
  component: JumbotronComponent,
  decorators: [
    moduleMetadata({
      imports: [JumbotronComponent],
      providers: [],
    }),
  ],
  tags: ['autodocs'],
} as Meta<JumbotronComponent>;
const Template: Story<JumbotronComponent> = (args: JumbotronComponent) => ({
  props: args,
  template: `
    <black-pearl-jumbotron [shadow]="shadow">
            <p>account works!</p>
    </black-pearl-jumbotron>
  `,
});
export const WorkBack = Template.bind({});
WorkBack.args = {
  shadow: 'shadow-none',
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
};

const Parent: Story<JumbotronComponent> = (args: JumbotronComponent) => ({
  props: args,
  template: `
    <div [ngStyle]="{
           'margin.rem':'1'
        }  "
        [ngClass]="[padding, margin]"
        >
        <black-pearl-jumbotron [shadow]="shadow">
                <p>account works!</p>
        </black-pearl-jumbotron>
    </div>
  `,
});
export const WorkParent = Parent.bind({});
WorkParent.args = {
  shadow: 'shadow-none',
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
  padding: {
    control: 'select',
    options: ['m-1', 'm-2', 'mx-0 my-1', 'mx-1 my-2', 'mx-4 my-1', 'm-0'],
    defaultValue: 'm-0',
  },
  margin: {
    control: 'select',
    options: ['p-1', 'p-2', 'px-0 py-1', 'px-1 py-2', 'px-4 py-1', 'p-0'],
    defaultValue: 'p-0',
  },
};
