export interface SideBarConfig {
  name: string;
  icon: string;
  tree?: SideBarConfig[];
  path: string;
}
