import { ConferenceCollectionPage } from "../collection-page";
import { iclr2026Papers } from "../../new-conference-data";

export default function Iclr2026Page() {
  return <ConferenceCollectionPage name="ICLR" papers={iclr2026Papers} description="从统一脑基础模型、个体功能表征到图像与视频解码，关注表示学习如何连接真实脑活动与外部世界。" />;
}
