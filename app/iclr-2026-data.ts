import type { ConferencePaper } from "./conference-data";

export const iclr2026Papers: ConferencePaper[] = [
  {
    "id": "iclr2026-nrf",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Beyond Grid-Locked Voxels: Neural Response Functions for Continuous Brain Encoding",
    "authors": "Haomiao Chen, Keith W Jamison, Mert R. Sabuncu, Amy Kuceyeski",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/e624a43624008a903f1e17c5cbf02ed8-Abstract-Conference.html",
    "review": "https://openreview.net/forum?id=wBKXuuLZbc",
    "preprint": "https://arxiv.org/abs/2510.07342",
    "tags": [
      "fMRI",
      "视觉编码",
      "连续神经场",
      "跨被试适配"
    ],
    "introZh": "把图像到脑响应的映射写成可查询任意解剖坐标的连续函数，解除对固定体素网格的依赖。",
    "abstractZh": "神经编码模型旨在预测自然图像诱发的 fMRI 脑响应。fMRI 数据以三维体素体积采集，每个体素具有明确的脑内空间位置。然而，传统编码模型通常把体积展平为一维向量，并将体素响应视作独立输出。这会移除空间上下文、丢弃解剖信息，并将模型绑定到被试特异的体素网格。我们提出神经响应函数 NRF，将 fMRI 活动建模为解剖空间上的连续函数，而非平坦的体素向量。给定图像和标准 MNI 空间中的坐标 (x,y,z)，NRF 预测该位置的响应。这一表述将预测与训练网格解耦，支持任意空间分辨率的查询和不依赖分辨率的分析。通过将模型锚定于解剖空间，NRF 利用脑响应的两个性质：第一，局部平滑性，即相邻体素表现出相似响应模式，连续建模能够捕捉这些相关并提高数据效率；第二，跨被试对齐，即 MNI 坐标统一不同个体的数据，使在一名被试上预训练的模型可以在新被试上微调。实验中，NRF 在被试内编码和跨被试适配上均优于基线，在大幅减少所需数据量的同时保持较高性能。据我们所知，NRF 是首个超越展平体素、学习图像到三维脑响应连续映射的解剖感知编码模型。",
    "relevance": "论文事实：模型将视觉特征与 MNI 坐标结合，学习连续位置上的 fMRI 响应，并验证新被试微调。研究推断：可以把你的图像→fMRI 分支改为坐标条件响应场，再对原图与物体移除反事实在同一冻结位置集合上计算差值，检验空间连续性是否提高 mask 级验证的数据效率。",
    "limitation": "解剖坐标一致不等于功能完全对齐；跨被试结果包含微调，不能称为零样本。查询更密网格也不等于获得了更高分辨率的真实神经测量。"
  },
  {
    "id": "iclr2026-brain-it",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Brain-IT: Image Reconstruction from fMRI via Brain-Interaction Transformer",
    "authors": "Roman Beliy, Amit Zalcher, Jonathan Kogman, Navve Wasserman, Michal Irani",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/c9fd326fd03eaf52f672c31cde9658af-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "图像重建",
      "跨被试",
      "功能体素簇"
    ],
    "introZh": "让跨被试共享的功能体素簇交换信息，并同时预测局部语义与结构特征以引导扩散重建。",
    "abstractZh": "从人的 fMRI 脑记录重建其所见图像，为非侵入式观察人脑提供了一扇窗口。尽管扩散模型推动了近期进展，现有方法仍常缺乏对实际所见图像的忠实性。我们提出脑启发的方法 Brain-IT，通过脑交互 Transformer（BIT）实现功能相似脑体素簇之间的有效交互。这些功能簇由所有被试共享，作为整合同一大脑内部及不同大脑之间信息的构件。全部模型组件在体素簇与被试之间共享，从而能够利用有限数据高效训练。为了指导图像重建，BIT 预测两类互补的局部图像块特征：高层语义特征将扩散模型引向正确语义内容，低层结构特征则以正确的粗略图像布局初始化扩散过程。BIT 的设计使脑体素簇信息能够直接流向局部图像特征。基于这些原则，本方法能够忠实重建所见图像，在视觉质量与标准客观指标上均超越已有先进方法。此外，对于新被试，仅用一小时 fMRI 数据即可获得与已有方法使用完整四十小时记录时相当的结果。",
    "relevance": "论文事实：功能体素簇、模型组件与局部图像特征共同承担跨被试共享，另有新被试一小时适配实验。研究推断：可比较你的 HCP ROI token 与学习得到的功能簇 token，检验哪个更利于保持局部物体身份、布局及反事实差异。",
    "limitation": "新被试一小时适配不是无需校准；生成质量还受扩散先验影响。共享功能簇能否迁移到不同刺激域、采集协议和皮层空间，需要独立验证。"
  },
  {
    "id": "iclr2026-vcflow",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "A Cognitive Process-Inspired Architecture for Subject-Agnostic Brain Visual Decoding",
    "authors": "Jingyu Lu, Haonan Wang, Qixiang Zhang, Xiaomeng Li",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/994545b2308bbbbc97e3e687ea9e464f-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "视频重建",
      "跨被试泛化",
      "腹侧与背侧通路"
    ],
    "introZh": "显式区分早期视觉皮层、腹侧和背侧通路，学习无需目标被试重训的视觉重建表征。",
    "abstractZh": "被试无关脑解码旨在无需被试特异训练的条件下，从 fMRI 重建连续视觉体验，具有重要临床应用潜力。然而，跨被试泛化的困难与脑信号的复杂性使这一方向仍缺乏充分研究。我们提出 Visual Cortex Flow Architecture（VCFlow），一种新型层级解码框架，显式建模人类视觉系统的腹侧—背侧架构，以学习多维表征。通过解耦并利用早期视觉皮层、腹侧及背侧通路的特征，VCFlow 捕捉对视觉重建至关重要的多样且互补的认知信息。我们进一步引入特征级对比学习策略，增强被试不变语义表征的提取，从而提高其对此前未见被试的适用性。传统流程需要每名被试超过十二小时的数据和大量计算；相比之下，VCFlow 在平均准确率仅损失 7% 的情况下，无需任何重训即可在十秒内生成一段重建视频，提供了快速且可扩展的临床解决方案。",
    "relevance": "论文事实：论文将早期、腹侧与背侧特征分开建模，并用特征对比学习推动未见被试泛化。研究推断：你的共享/私有模型可以在视觉层级之外显式保留通路变量，再用冻结目标被试和独立电影评估真正的 subject-invariant 内容。",
    "limitation": "摘要的 7% 为作者汇总比较，不能当作任意指标的普遍损失上限；还需核查所有划分是否同时排除刺激与被试泄漏。生物启发模块划分并不自动构成通路机制的因果证据。"
  },
  {
    "id": "iclr2026-mindhier",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Moving Beyond Diffusion: Hierarchy-to-Hierarchy Autoregression for fMRI-to-Image Reconstruction",
    "authors": "Xu Zhang, Ruijie Quan, Wenguan Wang, Yi Yang",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/6fe6a2ba2594521d15af3b1f2162d79c-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "图像重建",
      "CLIP 对齐",
      "自回归生成",
      "层级表征"
    ],
    "introZh": "将不同层级 fMRI 表征分别注入匹配尺度的自回归生成阶段，从全局语义逐步恢复局部细节。",
    "abstractZh": "从 fMRI 信号重建视觉刺激，是连接机器学习与神经科学的核心挑战。近期基于扩散的方法通常把 fMRI 活动映射为单一神经嵌入，并在整个生成过程中将其作为静态引导。然而，这种固定引导会压缩层级神经信息，也不符合图像重建各阶段的不同需求。为此，我们提出 MindHier，一种基于尺度自回归建模、由粗到细的 fMRI 图像重建框架。MindHier 包含三个部分：提取多层神经嵌入的层级 fMRI 编码器；约束其与 CLIP 特征逐层对应的层级到层级对齐方案；以及在相应尺度向自回归过程注入这些嵌入的尺度感知、由粗到细神经引导策略。这些设计使模型先合成全局语义，再细化局部细节，形成类似人类视觉感知的层级重建过程，为扩散方法提供一种高效且具有认知对齐动机的替代方案。NSD 数据集上的广泛实验表明，MindHier 相较扩散基线具有更好的语义忠实度、4.67 倍的推理速度，以及更确定的结果。",
    "relevance": "论文事实：本方法的核心是层级 fMRI 编码、逐层 CLIP 对齐和匹配尺度注入，生成主干为尺度自回归。研究推断：可以用共享语义核心负责粗尺度、模态/被试特异分支负责细尺度，再以同一神经编码器和相同生成预算比较条件注入机制。",
    "limitation": "层级网络结构与人类视觉层级相似属于设计动机，不能替代神经机制验证；速度与确定性比较依赖指定基线、硬件和采样设置，不能直接外推到全部扩散模型。"
  },
  {
    "id": "iclr2026-prism",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Seeing Through the Brain: New Insights from Decoding Visual Stimuli with fMRI",
    "authors": "Zheng Huang, Enpei Zhang, Weikang Qiu, Yinghao Cai, Carl Yang, Elynn Chen, Xiang Zhang, Rex Ying, Dawei Zhou, Yujun Yan",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/8dea30350a2d80e41125720356299a0d-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "图像重建",
      "结构化语义",
      "物体与属性",
      "文本中间空间"
    ],
    "introZh": "以物体、属性及关系构成的结构化文本作为 fMRI 与生成图像之间的中间表征。",
    "abstractZh": "理解大脑如何编码视觉信息，是神经科学与机器学习的核心挑战。一种有前景的方法是从功能磁共振成像信号重建视觉刺激，即图像。这包含两个阶段：将 fMRI 信号变换到潜空间，再用预训练生成模型从该空间重建图像。重建质量取决于潜空间与神经活动结构的相似程度，以及生成模型从该空间生成图像的能力。然而，哪类潜空间最支持这种变换，以及应如何组织它才能有效表达视觉刺激，仍不清楚。我们提出两项发现：第一，fMRI 信号与语言模型文本空间的相似性，高于与视觉空间或联合图文空间的相似性。第二，文本表征与生成模型应适配视觉刺激的组合性质，包括物体、详细属性与相互关系。基于这些认识，我们提出 PRISM，将 fMRI 信号投影到结构化文本空间，作为视觉刺激重建的中间表征。它包含以组合个体物体来降低物体检测错误的物体中心扩散模块，以及自动寻找最符合神经活动的关键属性和关系的搜索模块。真实数据集上的广泛实验表明，该框架优于已有方法，感知损失最多降低 6%。结果强调了利用结构化文本连接 fMRI 信号与图像重建的重要性。代码已公开。",
    "relevance": "论文事实：PRISM 显式分离物体、属性与关系并搜索神经匹配的组合描述。研究推断：可与你的 object-removed 反事实结合，检验移除物体时，结构化目标变量及对应 ROI 响应是否共同变化，同时控制文本长度和生成器先验。",
    "limitation": "文本空间更相似的结论依赖所选表征与度量，不是脑活动普遍以自然语言存储的证据。组合搜索和物体中心生成先验可能主导重建，须加入错误脑信号与只用文本先验的控制。"
  },
  {
    "id": "iclr2026-brain-semantoks",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Brain-Semantoks: Learning Semantic Tokens of Brain Dynamics with a Self-Distilled Foundation Model",
    "authors": "Sam Gijsen, Marc-Andre Schulz, Kerstin Ritter",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/162aa614b2684b3724375241195f55b4-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "基础模型",
      "自蒸馏",
      "功能网络 token",
      "跨数据集"
    ],
    "introZh": "将区域信号聚合成功能网络 token，再以时间稳定的自蒸馏目标学习可线性读取的脑动力学表征。",
    "abstractZh": "面向 fMRI 时间序列的基础模型，有望预测疾病和认知相关表型。然而，现有模型通常在较小脑区上采用掩蔽并重建目标训练。对低层信息的聚焦使表征容易受到噪声和时间波动影响，下游任务因而需要大量微调。我们提出 Brain-Semantoks，一个专门学习脑动力学抽象表征的自监督框架。其架构包含两项核心创新：语义 tokenizer 将带噪区域信号聚合成表示功能网络的稳健 token；自蒸馏目标约束表征在时间上的稳定性。我们提出新的训练课程以稳定这一目标，确保模型能从低信噪比时间序列中稳健学习有意义特征。我们证明，学习到的表征即使仅使用线性探针，也能在多种下游任务上取得较强表现。此外，全面的规模分析表明，增加无标签数据能够在无需域适配的情况下，持续改善分布外表现。",
    "relevance": "论文事实：研究以功能网络聚合与时间自蒸馏替代单纯低层重建，并评估线性探针和分布外数据扩展。研究推断：适合作为统一模型 fMRI 主干的对照，检验支持正确语义解码的缺失恢复是否更依赖网络级稳定变量，而非逐点波形重建。",
    "limitation": "这里的 semantic token 指抽象功能动力学表征，并非已经对齐 CLIP 或自然语言语义。表型预测与分布外表现也不等于完成脑到内容生成或跨模态转换。"
  },
  {
    "id": "iclr2026-soc-fmri",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Stochastic Optimal Control for Continuous-Time fMRI Representation Learning",
    "authors": "Joonhyeong Park, Byoungwoo Park, Chang-Bae Bang, Jungwon Choi, Hyungjin Chung, Byung-Hoon Kim, Juho Lee",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/a742348e01f3ba9a36307d13848359a8-Abstract-Conference.html",
    "tags": [
      "fMRI",
      "自监督表征",
      "连续时间",
      "随机最优控制",
      "异质采样"
    ],
    "introZh": "将不规则 fMRI 时间序列的自监督学习写成连续潜动力学中的随机最优控制问题。",
    "abstractZh": "学习稳健的 fMRI 表征，受到异质来源数据固有时间不规则性和噪声的根本挑战。现有自监督学习方法常通过离散化或平均 fMRI 信号，丢弃重要时间信息。为此，我们提出新框架，将自监督学习重新表述为随机最优控制（SOC）问题。该方法将脑活动建模为连续时间潜动力学，通过优化不依赖特定时间采样规则的控制策略，学习稳健的脑动力学表征。SOC 框架自然统一了掩蔽自编码（MAE）与联合嵌入预测（JEPA），提取紧凑、由控制导出的表征。此外，无需模拟的推理策略确保了面向大规模 fMRI 数据集的计算效率与可扩展性。模型在多种下游应用中取得先进表现，表明基于 SOC 的连续时间表征学习框架具有潜力。",
    "relevance": "论文事实：连续时间潜动力学和控制策略用于处理异质采样，并统一 MAE/JEPA。研究推断：在 EEG–fMRI 统一建模中，可用各模态真实时间戳条件化共享潜动力学，比较其与简单重采样对齐的差异。",
    "limitation": "摘要未建立 EEG–fMRI 联合训练或内容解码证据；连续时间数学表述不保证恢复真实神经时间常数，仍应核查血流动力学、采样率和站点差异的控制。"
  },
  {
    "id": "iclr2026-only-brains-align",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Only Brains Align with Brains: Cross-Region Alignment Patterns Expose Limits of Normative Models",
    "authors": "Larissa Höfling, Matthias Tangemann, Lotta Piefke, Susanne Keller, Matthias Bethge, Katrin Franke",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/b7868dedad7192f83c9efb042da43317-Abstract-Conference.html",
    "preprint": "https://arxiv.org/abs/2604.21780",
    "tags": [
      "fMRI",
      "表征对齐",
      "视觉编码",
      "跨脑区结构",
      "评估可靠性"
    ],
    "introZh": "用一个脑区与其余脑区的关系轮廓检验模型，区分能预测脑活动的工具与解释脑计算的模型。",
    "abstractZh": "神经科学与计算机视觉研究者通过模型—脑对齐基准比较人工与生物视觉系统。这些基准利用表征几何相似性或模型激活对神经响应的预测能力等度量对模型排序。然而，近期研究发现这些排序存在多种问题，尤其缺乏区分能力，从而引出模型“脑对齐”究竟意味着什么的问题。我们提出对齐模式，即每个脑区与其余脑区之间特有的功能关系轮廓，并主张合格的脑对齐模型应复现这些模式。首先，我们在 BOLD Moments 视频 fMRI 数据集的多个视觉 ROI 上，对广泛视觉模型应用标准基准流程，发现不同模型看似具有相同脑对齐程度，体现出传统基准区分能力不足。传统评价是逐点相似性检验，只评估模型与单个 ROI 是否对齐，因此容易受所选指标的不变性与缩放性质影响。相比之下，对齐模式分析（APA）是一种二阶结构一致性检验：对齐某 ROI 的模型，应复现该 ROI 特有的跨脑区对齐轮廓。应用这一检验后，我们发现，这些模式在不同被试的大脑之间高度稳定，但即使排名最高的模型也经常无法捕捉它们。看似等价的模型在关系标准下出现明显分化，证明 APA 增加了区分能力。最后，我们主张更清晰地区分模型作为工具与作为计算模型所需满足的条件。传统指标可能足以识别能预测神经活动的模型，但关于计算或算法相似性的主张需要更强证据，包括关系对齐模式的可复现性。",
    "relevance": "论文事实：APA 在视频 fMRI 中检验跨 ROI 关系轮廓，揭示单 ROI 对齐排序掩盖的差异。研究推断：你的反事实响应场和 ROI 激活—抑制 motif 可增加一项检验：模型是否保留真实被试之间稳定的跨 ROI 关系，而不只比较每个 ROI 的独立预测分数。",
    "limitation": "APA 仍是统计结构检验，而非对脑区因果机制的直接验证；其结论依赖数据集、ROI 选择和对齐度量。标题不意味着所有人工模型在所有层面都无法与脑对齐。"
  },
  {
    "id": "iclr2026-mindmix",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "MindMix: A Multimodal Foundation Model for Auditory Perception Decoding via Deep Neural-Acoustic Alignment",
    "authors": "Rui Liu, Zhige Chen, Pengshu, Wenlong You, Zhi-An Huang, Jibin Wu, K. C. Tan",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/b0ae046e198a5e43141519868a959c74-Abstract-Conference.html",
    "tags": [
      "EEG",
      "基础模型",
      "听觉感知",
      "跨模态对齐",
      "跨被试"
    ],
    "introZh": "先学习通用 EEG 表征，再以低秩跨注意力将神经信号与声学刺激深度对齐。",
    "abstractZh": "从非侵入式 EEG 解码复杂听觉体验是一个快速发展的领域，有望推动基础神经科学与人机交互。EEG 基础模型的近期进展产生了强大的神经表征，具有听觉解码潜力，但其有效性仍根本受限于声学刺激信息整合不足。特别是，神经信号与听觉输入缺乏深度耦合，限制了模型跨不同听觉任务泛化。为弥补这一缺口，我们提出多模态基础模型 MindMix，连接单模态 EEG 基础模型与任务特异听觉解码器。MindMix 采用两阶段训练：首先，在超过三千小时 EEG 上预训练高容量编码器，学习能够跨任务与被试迁移的通用特征；其次，利用超过一百小时配对数据，通过新提出的跨注意力低秩对齐模块学习神经—声学映射，实现细粒度跨模态信息整合。实验表明，MindMix 在听觉注意解码、听觉情绪识别和跨模态检索等任务上显著优于已有基线。本工作为多模态脑解码与听觉脑机接口提供基础，代码已公开。",
    "relevance": "论文事实：通用 EEG 预训练与配对神经—声学低秩对齐被分为两个阶段，另含跨模态检索评估。研究推断：可以比较你的共享语义核心与 Cross-Attention Low-Rank Alignment，分析配对数据量和被试 adapter 各自的贡献。",
    "limitation": "任务包含注意与情绪分类，不能将这些结果解释成开放语音、文本或音频生成。跨任务和跨被试收益需逐项核对数据排除与校准设置。"
  },
  {
    "id": "iclr2026-mindpilot",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "MindPilot: Closed-loop Visual Stimulation Optimization for Brain Modulation with EEG-guided Diffusion",
    "authors": "Dongyang Li, Kunpeng Xie, Mingyang Wu, Yiwei Kong, Jiahua Tang, Haoyang Qin, Chen Wei, Quanying Liu",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/b4dde7f1bc45bf9c0fda8db8f272b758-Abstract-Conference.html",
    "tags": [
      "EEG",
      "可控生成",
      "扩散模型",
      "闭环神经调控",
      "自然图像"
    ],
    "introZh": "将真实 EEG 反馈用于迭代优化自然图像，研究从生成刺激到目标脑响应的闭环控制。",
    "abstractZh": "大多数脑机接口研究关注将神经信号解码为行为或意图，相反方向的挑战——利用可控刺激引导脑活动——仍了解不足，视觉领域尤其如此。然而，设计能够稳定诱发目标神经响应的图像十分困难：主观状态缺乏清晰定量指标，EEG 反馈又带噪且不可微。我们提出 MindPilot，首个利用 EEG 信号作为优化反馈、引导自然图像生成的闭环框架。不同于局限于侵入式记录或低层闪烁刺激的既有工作，MindPilot 将非侵入式 EEG 与自然图像结合，把大脑视为黑箱函数，通过伪模型引导机制迭代细化图像，无需显式奖励或梯度。我们通过模拟与人体实验验证 MindPilot，展示高效语义目标检索、EEG 特征闭环优化，以及心理匹配与情绪调节任务中的人体被试验证。结果确立了 EEG 引导图像合成的可行性，为非侵入式闭环脑调控、双向脑机接口和神经信号引导的生成建模开辟方向。",
    "relevance": "论文事实：生成器以真实 EEG 作为闭环优化反馈，包含模拟与人体实验。研究推断：可以先用冻结图像→fMRI 模型提出受控候选，再用独立真人神经数据排序或验证，避免模型自己预测、自己验证的闭环。",
    "limitation": "优化某项 EEG 特征不自动意味着选择性改变特定认知机制；注意、唤醒和低层视觉属性均可能影响反馈。主观调节结果不能替代目标脑区或语义变量的独立干预检验。"
  },
  {
    "id": "iclr2026-codebrain",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "CodeBrain: Bridging Decoupled Tokenizer and Multi-Scale Architecture for EEG Foundation Model",
    "authors": "Jingying Ma, Feng Wu, Qika Lin, Yucheng Xing, Chenyu Liu, Ziyu Jia, Mengling Feng",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/86d1ab582afb247ccaa84bec4a7e24f7-Abstract-Conference.html",
    "tags": [
      "EEG",
      "基础模型",
      "时间频率解耦",
      "多尺度建模",
      "分布迁移"
    ],
    "introZh": "将时间与频率编码为离散 token，再以全局结构卷积和局部注意力兼顾长程依赖与局部事件。",
    "abstractZh": "EEG 为脑活动提供实时观察，并支持多种神经科学应用。尽管 EEG 基础模型有望解决任务特异模型的扩展性问题，当前方法学到的表征仍缺乏临床可解释性和判别力，难以高效捕捉全局依赖，并忽略重要的局部神经事件。我们提出两阶段 EEG 基础模型 CodeBrain。第一阶段引入 TFDual-Tokenizer，将异质的时间与频率 EEG 信号解耦为离散 token，以平方级方式扩展表示空间来增强判别能力，并通过提示与神经事件、频谱节律的潜在联系，提供领域特异的表征层可解释性。第二阶段提出多尺度 EEGSSM 架构，将结构化全局卷积与滑动窗口注意力结合，高效捕捉稀疏长程依赖和局部依赖，呼应脑的小世界拓扑。在规模最大的公开 EEG 语料上预训练后，CodeBrain 在八项下游任务、十个数据集的分布迁移下取得较强泛化表现，并得到全面消融、规模分析和可解释性评价支持。代码与预训练权重已公开。",
    "relevance": "论文事实：模型显式解耦时域与频域 token，并结合全局和局部依赖。研究推断：可作为统一 fMRI–EEG 模型的 EEG 前端，对比时频解耦是否改善缺失通道恢复后的语义可读性。",
    "limitation": "神经事件或频带相关的解释并非因果机制验证；摘要未证明脑到图像、文本或视频生成。基础模型泛化还应审计预训练与下游数据集、被试及 session 重叠。"
  },
  {
    "id": "iclr2026-eeg-foundation-worth",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "Are EEG Foundation Models Worth It? Comparative Evaluation with Traditional Decoders in Diverse BCI Tasks",
    "authors": "Liuyin Yang, Qiang Sun, Ang Li, Marc Van Hulle",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/f0f39b7686634fc81ca0112566b2c05f-Abstract-Conference.html",
    "tags": [
      "EEG",
      "基础模型",
      "公平评估",
      "线性探针",
      "数据效率"
    ],
    "introZh": "系统比较 EEG 基础模型、紧凑神经网络与经典解码器，检验复杂预训练究竟在哪些条件下有收益。",
    "abstractZh": "基础模型近期成为学习可泛化 EEG 表征、服务脑机接口的一种有前景方法，但它们相对传统方法，尤其经典非神经方法的真实优势仍不清楚。我们在多种数据集、解码任务和六种评价协议下，对先进 EEG 基础模型进行全面基准评估，并使用严格统计检验。我们提出时空 EEGFormer（ST-EEGFormer），一个简单有效的 ViT 基线，仅通过超过八百万 EEG 片段上的掩蔽自编码预训练。结果表明，微调基础模型在数据丰富的群体水平设置中表现良好，但在数据稀缺场景下，经常无法显著超过紧凑神经网络，甚至经典非神经解码器。此外，线性探针始终较弱，不同下游任务的性能差异很大，神经解码网络之间也未观察到清晰的规模定律。这些结果暴露了预训练与下游微调之间的明显缺口，复杂预训练目标的收益往往因此削弱。我们进一步识别出影响表现的隐含架构因素，强调透明且统计严格的评价需求。总体而言，本研究呼吁共同建设大规模 EEG 数据集及公平、可复现基准，以推动 EEG 基础模型发展。",
    "relevance": "论文事实：本研究在六种协议下将基础模型与经典、紧凑模型比较，并报告小数据和线性探针的局限。研究推断：你的跨被试与缺失模态实验应同时报告冻结主干、线性探针、低秩适配和全量微调，以区分通用表征收益与下游拟合收益。",
    "limitation": "结果受所选任务、模型、预训练语料与超参数预算约束，不能推出 EEG 基础模型普遍无效；对内容解码或统一多模态生成的结论仍需专门基准。"
  },
  {
    "id": "iclr2026-dynamic-video-experts",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "The Human Brain as a Dynamic Mixture of Expert Models in Video Understanding",
    "authors": "Christina Sartzetaki, Anne Zonneveld, Pablo Oyarzo, Alessandro Gifford, Radoslaw Cichy, Pascal Mettes, Iris Groen",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/221f7e3c1c8b4ee48d45a53589051590-Abstract-Conference.html",
    "tags": [
      "EEG",
      "视频表征",
      "模型脑对齐",
      "时间整合",
      "CT-RSA"
    ],
    "introZh": "以动态 EEG 对齐一百多个视频模型，区分静态物体、动作语义与时间整合在不同阶段的贡献。",
    "abstractZh": "人脑是处理动态视觉输入最有效且最灵活的系统。比较深度视频模型与脑活动的表征，有助于理解高效视频加工的机制方案，从而改进脑科学理解与模型设计。现有模型—脑对齐工作主要关注 fMRI，细粒度动态加工仍有许多问题。我们首次开展大规模模型基准，将短自然视频的动态 EEG 记录与模型对齐。研究在时间整合、分类任务、架构与预训练等维度分析一百多个模型，提出跨时间表征相似性分析 CT-RSA，将时间展开的最佳模型特征与动态脑响应匹配，汇总一千万个对齐分数。结果揭示了脑整合连续视觉输入的新特征，超越从低层到高层表征的标准时间加工层级。最初与层级静态物体加工对齐后，后部电极响应最符合中层、整合时间的动作特征，并与特征出现时间高度对应；相反，额部电极响应最符合高层静态动作表征，与视频时间没有对应。此外，整合时间的状态空间模型与中间阶段后部活动的对齐更好，自监督预训练在此也有帮助。不同时间偏向不同模型类型，反映任务与时间整合偏好的变化，我们以动态混合专家作比喻。我们认为，单一最佳脑对齐模型需要能组合并动态切换这些能力的训练与架构。",
    "relevance": "论文事实：研究用 CT-RSA 对比一百多个模型与视频 EEG 的动态结构，动态混合专家是对结果的解释比喻。研究推断：可为你的统一模型设置静态语义、动作与时间分支，再用 EEG 时间结构和 fMRI ROI 分布进行互补验证。",
    "limitation": "这不是直接训练或验证了脑内 MoE 路由器；头皮额后电极不能直接等同于局部皮层源。表征相似性不能单独建立计算机制或因果关系。"
  },
  {
    "id": "iclr2026-omnimouse",
    "conference": "ICLR",
    "year": 2026,
    "level": "A",
    "title": "OmniMouse: Scaling properties of multi-modal, multi-task Brain Models on 150B Neural Tokens",
    "authors": "Konstantin F. Willeke, Polina Turishcheva, Alex Gilbert, Goirik Chakrabarty, Hasan Bedel, Paul Fahey, Yongrong Qiu, Marissa Weis, Michaela Vystrčilová, Taliah Muhammad, Lydia Ntanavara, Rachel Froebe, Kayla Ponder, Zheng Huan Tan, Emin Orhan, Erick M Cobos, Sophia Sanborn, Katrin Franke, Fabian Sinz, Alexander S Ecker, Andreas Tolias",
    "source": "ICLR 2026 主会 · 官方论文集",
    "href": "https://proceedings.iclr.cc/paper_files/paper/2026/hash/d97122f599bdc6250c2334fa89c71606-Abstract-Conference.html",
    "tags": [
      "钙成像",
      "基础模型",
      "统一多模态",
      "多任务",
      "规模规律"
    ],
    "introZh": "在大规模小鼠视觉皮层记录上统一神经预测、行为解码与预测未来活动，检验脑模型的数据与参数扩展规律。",
    "abstractZh": "扩大数据与人工神经网络规模推动了语言和视觉 AI 的突破，但类似原则是否适用于脑活动建模仍不清楚。我们利用来自 73 只小鼠、323 个 session、视觉皮层 310 万神经元的数据集，包含自然电影、图像、参数化刺激和行为期间记录的超过 1500 亿神经 token。我们训练多模态、多任务模型，在测试时灵活支持神经响应预测、行为解码、未来神经活动预测，或这三者的任意组合。OmniMouse 在几乎所有评价设置中优于专门基线，取得先进表现。我们发现，增加数据可以稳定改善性能，而扩大模型的收益会饱和。这与标准 AI 的规模叙事相反：语言与计算机视觉拥有海量数据，参数扩展成为主要驱动力；脑建模中，即使是相对简单的小鼠视觉皮层，尽管记录庞大，模型仍受数据限制。系统性规模变化还提示神经建模可能存在相变，更大、更多样的数据或许能够解锁性质不同的新能力，类似大型语言模型中观察到的涌现性质。代码已公开。",
    "relevance": "论文事实：真实小鼠视觉皮层记录、刺激与行为被置于同一多模态多任务接口，并分别测量数据量和参数量扩展。研究推断：你的任意模态子集模型可采用类似任务掩码接口，但应单独估计配对数据多样性、被试数量和模型容量的收益。",
    "limitation": "证据来自小鼠视觉皮层钙成像，不能直接外推至人类 fMRI/EEG 或开放语义重建；未来相变属于研究展望而非已证实结果。论文集神经元计数为 310 万，项目页旧版本可能为 230 万，应以正式论文版本为准。"
  }
];
