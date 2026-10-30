import { cvpr2026Papers, icml2026Papers, type ConferencePaper } from "../../conference-data";
import { iclr2026Papers, neurips2026Papers, eccv2026Papers } from "../../new-conference-data";
import { nature2026Papers } from "../../nature-2026-data";
import { getLibraryPaper, paperReadingHref, venuePaperId } from "../../paper-library";

const collections: Record<string, ConferencePaper[]> = {
  ICLR: iclr2026Papers, NeurIPS: neurips2026Papers, ECCV: eccv2026Papers,
  CVPR: cvpr2026Papers, ICML: icml2026Papers, Nature: nature2026Papers,
};

export function reference(venue: string, id: string, label: string) {
  const paper = collections[venue]?.find((item) => item.id === id);
  if (!paper) throw new Error(`Missing evolution reference: ${venue}/${id}`);
  return { label, title: paper.title, href: paperReadingHref(venuePaperId(paper)), source: paper.source };
}

function briefReference(id: string, label: string) {
  const paper = getLibraryPaper(id);
  if (!paper) throw new Error(`Missing evolution brief: ${id}`);
  return { label, title: paper.title, href: paperReadingHref(id), source: paper.source };
}

export const frontiers = [
  {
    id: "spatial-representation",
    title: "fMRI 的空间结构，成为模型本身的一部分",
    finding: "NRF 把图像诱发响应写成解剖坐标上的连续函数；FlexiBrain 接收异质原生空间 fMRI；HBAR 比较体素、脑区和网络三级 token。FlatClip 则用冻结图像模型处理皮层平展图，追问已有性能究竟有多少来自空间几何。研究不再只比较编码器大小，也开始比较观测坐标与压缩方式。",
    boundary: "这些方法解决的层次不同：NRF 是刺激→脑响应编码，FlexiBrain、HBAR 和 FlatClip 主要学习脑信号表征。空间重建或表型成绩提升，尚不能直接推出内容解码改善。",
    question: "更紧凑或更连续的表示，是否仍保留支持正确语义解码的局部信息？应同时测量响应保真、刺激检索与个体差异。",
    papers: [reference("ICLR", "iclr2026-nrf", "NRF · ICLR"), reference("ECCV", "flexibrain", "FlexiBrain · ECCV"), reference("NeurIPS", "neurips-2026-153906", "HBAR · NeurIPS"), reference("NeurIPS", "neurips-2026-152015", "FlatClip · NeurIPS")],
  },
  {
    id: "subject-generalization",
    title: "跨被试共享，从统一坐标走向共享功能与个体残差",
    finding: "Brain-IT 以共享功能体素簇建立跨脑交互，再对新被试进行少量校准；BrainTC 将共享张量基与被试残差分开，分别研究零样本与残差适配；VCFlow 用视觉通路分解和对比学习研究未见被试解码。BrainCoDec 则在测试时用上下文示例适应个体，不更新模型参数。",
    boundary: "一小时校准、无需重训和完全不使用目标被试信息是不同设置。解剖对齐不等于功能完全对齐；未见被试也可能仍共享训练刺激或数据集条件。",
    question: "固定刺激划分和主干后，个体适配器究竟恢复了什么？需要把新被试、新刺激、新 session 和新站点的外推分别报告。",
    papers: [reference("ICLR", "iclr2026-brain-it", "Brain-IT · ICLR"), reference("NeurIPS", "neurips-2026-154012", "BrainTC · NeurIPS"), reference("ICLR", "iclr2026-vcflow", "VCFlow · ICLR"), reference("CVPR", "braincodec", "BrainCoDec · CVPR")],
  },
  {
    id: "structured-generation",
    title: "生成式解码，从一个语义向量走向分层和结构化条件",
    finding: "MindHier 将多层 fMRI 表征注入匹配尺度的自回归生成；PRISM 用物体、属性和关系组织文本中间空间；CortexVideo 同时利用语义与空间线索；Follow-Your-Mind 把脑信号引导的合成与局部编辑连接起来。扩散模型之外，自回归与流模型也进入脑条件生成。",
    boundary: "更换生成器不等于增加了神经信息。局部细节、布局和语义可能来自不同条件与预训练先验；不能只凭生成结果逼真，宣称恢复了完整视觉体验。",
    question: "改变一个目标语义时，目标属性是否随之改变，非目标背景是否保持？零脑信号、错配脑信号与仅视觉条件要使用同一生成预算比较。",
    papers: [reference("ICLR", "iclr2026-mindhier", "MindHier · ICLR"), reference("ICLR", "iclr2026-prism", "PRISM · ICLR"), reference("ECCV", "cortexvideo", "CortexVideo · ECCV"), reference("ECCV", "follow-your-mind", "Follow-Your-Mind · ECCV")],
  },
  {
    id: "multimodal-unification",
    title: "“统一多模态”开始出现实证，但统一的层次必须说清",
    finding: "Brain-OF 联合预训练 fMRI、EEG、MEG，以共享与路由专家处理共性和模态差异；UniEFS 研究上下文感知的 EEG→fMRI 合成；另一项研究用 fMRI 微调语言表征，改善 ECoG 编码。EEG 侧的 BRIDGE 则把视觉模型深度与神经响应时间阶段同时纳入对齐。",
    boundary: "联合预训练、模态转换、跨模态迁移不是同一种能力。多模态刺激驱动 fMRI 编码，也不等于联合建模多种脑信号。上述证据尚未统一证明任意模态子集都能恢复缺失信号并维持内容解码。",
    question: "拿走某一模态后，模型能否恢复支持正确语义解码的关键信息？需要将共享语义、模态特异信息与被试变量分别验证。",
    papers: [reference("NeurIPS", "neurips-2026-155505", "Brain-OF · NeurIPS"), reference("ICML", "uniefs", "UniEFS / Mind the State · ICML"), reference("NeurIPS", "neurips-2026-153546", "fMRI→ECoG 表征迁移 · NeurIPS"), reference("NeurIPS", "neurips-2026-155233", "BRIDGE · NeurIPS")],
  },
  {
    id: "naturalistic-dynamics",
    title: "自然情境与长时程预测，扩展了静态重建的边界",
    finding: "BrainVista 在已观测刺激条件下滚动预测未来 fMRI；BrainWorld 用结构 MRI 作为个体解剖先验生成脑动态。TRIBE v2 合成响应被用于提高真实脑解码的数据效率；AVID 为听觉诱导的视觉想象建立专门数据和评价。数据深度、动态预测和内部体验开始成为独立研究轴。",
    boundary: "已观测刺激条件预测不是自主脑世界模型；生成轨迹稳定不等于生理机制真实。合成数据可能继承教师偏差；听觉诱导想象也仍受语言与提示内容影响。",
    question: "模型能否在未来 session、未见影片和未见任务上保持可信预测？应分开测量滚动误差、语义保真与合成数据的真实测试收益。",
    papers: [reference("NeurIPS", "neurips-2026-153166", "BrainVista · NeurIPS"), reference("NeurIPS", "neurips-2026-155412", "BrainWorld · NeurIPS"), reference("NeurIPS", "neurips-2026-154738", "TRIBE v2 数据增强 · NeurIPS"), reference("NeurIPS", "neurips-2026-139564", "AVID · NeurIPS")],
  },
  {
    id: "mechanisms-evidence",
    title: "科学价值，从预测分数走向可区分、可干预的假设",
    finding: "APA 检验跨 ROI 关系轮廓；稀疏语义—皮层原子将语义特征与多被试脑图谱共同建模。10 月个体感知预印本提示，行为对齐改善可能伴随脑响应预测下降。EEG SAE 检查操控的目标效应与非目标损伤；小鼠 V1 工作则将模型提出的刺激带回真实记录验证。",
    boundary: "可读取、模型实际使用、可选择操控和真实脑因果机制，是逐级增强的证据。统计对齐、解释图或潜变量擦除，任何一项都不足以单独跨越这些层级。",
    question: "一个语义方向或脑区假设，能否在冻结模型、独立刺激和真实脑测量上复现？反事实变化还需排除编辑本身的低层视觉混杂。",
    papers: [reference("ICLR", "iclr2026-only-brains-align", "APA / Only Brains Align · ICLR"), reference("NeurIPS", "neurips-2026-151712", "稀疏语义—皮层原子 · NeurIPS"), briefReference("arxiv-2610-22569", "个体感知对齐 · 10 月预印本"), reference("NeurIPS", "neurips-2026-150909", "EEG SAE 操控审计 · NeurIPS"), reference("Nature", "nn-bipartite-invariance", "V1 数字孪生闭环 · Nature Neuroscience")],
  },
];

export const unificationRows = [
  { kind: "双向任务统一", evidence: "在同一框架中学习刺激→脑与脑→刺激，或脑—视觉—语言的多方向任务。", limit: "不等于联合观测多种脑信号，也不保证任意缺失模态恢复。", papers: [reference("CVPR", "neuroflow", "NeuroFlow"), reference("ICML", "brainjanus", "BrainJanus")] },
  { kind: "脑模态联合预训练", evidence: "fMRI、EEG、MEG 接入共享主干，保留模态特异计算。", limit: "联合训练不自动证明共享的是刺激语义，或缺失后内容可恢复。", papers: [reference("NeurIPS", "neurips-2026-155505", "Brain-OF")] },
  { kind: "模态转换与表征迁移", evidence: "从 EEG 合成 fMRI，或以 fMRI 微调表征改善 ECoG 编码。", limit: "条件合成与特征迁移需分别评价，不能合并宣称原始波形任意互译。", papers: [reference("ICML", "uniefs", "UniEFS"), reference("NeurIPS", "neurips-2026-153546", "fMRI→ECoG 迁移")] },
  { kind: "多模态刺激编码", evidence: "联合视觉、声音和语言特征预测 fMRI。", limit: "刺激是多模态，不代表 EEG、MEG 等脑记录也参与了联合训练。", papers: [reference("NeurIPS", "neurips-2026-149712", "MIRAGE")] },
];

export const readingRoutes = [
  { title: "先建立 fMRI 编解码主干", text: "精读 NRF 的坐标条件响应、Brain-IT 的功能簇共享，再看 MindHier 如何把层级神经条件送入生成器。", papers: [reference("ICLR", "iclr2026-nrf", "NRF"), reference("ICLR", "iclr2026-brain-it", "Brain-IT"), reference("ICLR", "iclr2026-mindhier", "MindHier")] },
  { title: "再判断统一模型能做什么", text: "对照 Brain-OF 的联合预训练、UniEFS 的模态转换与 MIRAGE 的多模态刺激编码，避免把不同输入输出设定混为一谈。", papers: [reference("NeurIPS", "neurips-2026-155505", "Brain-OF"), reference("ICML", "uniefs", "UniEFS"), reference("NeurIPS", "neurips-2026-149712", "MIRAGE")] },
  { title: "最后设计可检验的神经科学实验", text: "从 APA 的跨脑区结构检验到 SAE 的选择性操控，再对照小鼠 V1 的真实实验闭环，明确自己已有哪一级证据。", papers: [reference("ICLR", "iclr2026-only-brains-align", "APA"), reference("NeurIPS", "neurips-2026-150909", "EEG SAE"), reference("Nature", "nn-bipartite-invariance", "V1 闭环实验")] },
];
