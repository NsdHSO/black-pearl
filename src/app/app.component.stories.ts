import {AppComponent} from "./app.component";
import {Meta, Story} from "@storybook/angular";

export default {
    title: 'AppComponent',
    component: AppComponent,
    decorators: [],
    tags: ['autodocs'],
} as Meta<AppComponent>;
const Template: Story<AppComponent> = (args: AppComponent) => ({
    props: args,
});export const WorkBack = Template.bind({});
