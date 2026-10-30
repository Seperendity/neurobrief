import { ConferenceCollectionPage } from "../collection-page";
import { eccv2026Papers } from "../../new-conference-data";

export default function Eccv2026Page() {
  return <ConferenceCollectionPage name="ECCV" papers={eccv2026Papers} description="围绕脑信号到图像与视频、视觉语义对齐及跨被试泛化，整理真实脑活动参与建模和验证的视觉研究。" />;
}
