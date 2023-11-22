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
        }  ">
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
};
