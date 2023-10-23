export interface ImageManagerStatic {
  /**
   *
   * @param url - remote url of image
   * @param x - start of x axis
   * @param y - start of y axis
   * @param width - distance from x on the x axis
   * @param height - distance from y on the y axis
   * @returns local path of new cropped image saved in temp directory
   */
  saveImage: (
    url: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => Promise<string>;
}
