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
});
export const WorkBack = Template.bind({});
WorkBack.args = {};
export const Currency = Template.bind({});
Currency.args = {};
