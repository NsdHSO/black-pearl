/**
 * Represents an icon with a name and its corresponding value.
 */
export interface Icon {
  /**
   * The name of the icon.
   * This should be a descriptive identifier for the icon.
   */
  name: string;

  /**
   * The value or path representing the icon.
   * This can be a URL, SVG content, or any resource depicting the icon.
   */
  value: string;
}
