export class ImageChecker {
  static isImage = (ext: string) => ['jpg', 'jpeg', 'png'].includes(ext.toLowerCase());
}
