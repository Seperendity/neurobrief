import { ConferenceCollectionPage } from "../collection-page";
import { neurips2026Papers } from "../../new-conference-data";

export default function Neurips2026Page() {
  return <ConferenceCollectionPage name="NeurIPS" papers={neurips2026Papers} description="关注脑信号基础模型、脑编解码与模型驱动的神经表征研究。以可核实的主会录用记录为依据，区分神经证据、模型预测与机制推断。" />;
}
