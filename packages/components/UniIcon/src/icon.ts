import GithubImage from "./assets/img/github.png";
/** icon color type */
export type IconType = "primary" | "success" | "warn" | "danger";
/** valid font icon */
type FontIcon = (typeof ICON_FONT_LIST)[number];
const ICON_FONT_LIST = ["close"] as const;
/** valid image icon */
type ImgIcon = keyof typeof IMG_ICON_SRC_MAP;
const IMG_ICON_SRC_MAP = {
  github: GithubImage,
} as const;
/** is img icon or font icon */
function isImgIcon(icon: IconName): icon is ImgIcon {
  return icon in IMG_ICON_SRC_MAP;
}
/** get image src */
export const getImgIconSrc = (icon: IconName) =>
  isImgIcon(icon) ? IMG_ICON_SRC_MAP[icon] : "";
/** valid icon */
export type IconName = FontIcon | ImgIcon;
