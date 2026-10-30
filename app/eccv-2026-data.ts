import type { ConferencePaper } from "./conference-data";

export const eccv2026Papers: ConferencePaper[] = [
  {
    "id": "flexibrain",
    "conference": "ECCV",
    "year": 2026,
    "level": "A",
    "title": "FlexiBrain: Resolution-Agnostic Voxel-Level Encoding for Native fMRI",
    "authors": "Mo Wang, Wenhao Ye, Junfeng Xia, Minghao Xu, Hongkai Wen, Quanying Liu",
    "source": "ECCV 2026 主会 · 官方录用名单与论文页面",
    "href": "https://eccv.ecva.net/virtual/2026/poster/3953",
    "preprint": "https://arxiv.org/abs/2606.11500",
    "tags": [
      "fMRI",
      "基础模型",
      "原生空间",
      "跨分辨率",
      "Mamba-JEPA"
    ],
    "introZh": "用物理尺度定义 patch 并动态调整其大小，直接学习不同空间与时间分辨率的原生 fMRI，减少统一空间标准化的依赖。",
    "abstractZh": "大规模深度学习模型在神经科学中的成功，从根本上受到严重数据异质性的限制。汇集自不同来源的原生 fMRI 数据，其空间和时间分辨率均存在显著差异。因此，大多数现有框架依赖冗长、僵化的预处理流程，强制统一各数据集。这种做法带来两个关键限制：一是可能损害被试特异的解剖信息，二是计算开销显著，通常每名被试需要数小时处理。我们提出 FlexiBrain，一种基于 Mamba-JEPA、面向原生 fMRI 的分辨率无关体素级编码框架。FlexiBrain 以真实世界的物理单位定义 patch 大小，并采用动态 patch 尺寸调整，从而绕过具有破坏性的空间标准化，直接接收原生空间数据。我们使用高效的 Mamba-JEPA 主干实例化这一框架，对高维四维 fMRI 信号建模。在五项不同的下游神经科学任务上，FlexiBrain 持续优于近期先进方法，在不使用外部数据增强的情况下取得最高 12 个百分点的提升。更重要的是，FlexiBrain 可以作为无缝插入的模块，显著降低预处理成本，加快稳健体素级 fMRI 基础模型的发展。代码公开于 https://github.com/OneMore1/FlexiBrain。",
    "relevance": "论文事实：模型通过物理尺度 patch 与动态尺寸调整处理异质原生 fMRI，并以五项下游任务验证可复用表征。研究推断：可作为统一 fMRI–EEG 模型的 fMRI 前端，让共享语义层与扫描分辨率、解剖坐标适配分别建模；也适合比较统一标准空间与原生空间对跨被试泛化的影响。",
    "limitation": "这里的 encoding 指信号表征学习，并非已实现从图像预测 fMRI 的刺激编码器；下游任务提升也不直接证明脑到图像、文本或视频生成改善。减少空间标准化不意味着完全免除运动校正和质量控制；仍需验证未知站点、扫描协议与被试的严格外推。"
  },
  {
    "id": "cortexvideo",
    "conference": "ECCV",
    "year": 2026,
    "level": "A",
    "title": "CortexVideo: A Semantic-Spatial Dual-Anchor Framework for High-Fidelity fMRI-to-Video Reconstruction",
    "authors": "Xiaoquan Shen, Jiajun Li, Jiaxuan Chen, Gang Pan",
    "source": "ECCV 2026 主会 · Springer 正式论文集 · 2026-09-16 在线发表",
    "href": "https://link.springer.com/chapter/10.1007/978-3-032-37314-4_37",
    "tags": [
      "fMRI",
      "brain-to-video",
      "语义对齐",
      "空间定位",
      "双锚点生成"
    ],
    "introZh": "把被试自适应语义与关键帧感知权重共同用于视频重建，减少从模糊重建关键帧再生成描述所带来的语义漂移。",
    "abstractZh": "神经解码的近期进展，使直接从非侵入式脑信号重建视觉刺激成为可能。然而，由于动态场景固有的连续空间与语义变化，连续视频流重建仍然极具挑战。多数方法依赖“先重建、再描述”的范式，从重建的视频关键帧生成说明文字，而这些关键帧极易产生语义漂移。为克服这些困难，我们提出新解码框架 CortexVideo，从功能磁共振成像（fMRI）重建视频。受视觉双流假说启发，CortexVideo 引入双重引导解码策略：利用被试自适应语义信息引导视频重建，同时整合关键帧感知权重。实验表明，CortexVideo 从视频语义理解和空间定位两个关键维度，为已有层次模型提供了认知层面的增强。重建视频在语义与空间两方面均更忠实于视觉刺激，取得了作者所报告的先进结果。",
    "relevance": "论文事实：框架在 fMRI 条件下联合语义与空间线索，明确针对视频重建中的语义漂移与目标定位问题。研究推断：你的共享语义核心可与空间特异分支形成两个独立条件，并通过目标移除反事实检查语义变化是否局限于相关对象、空间支路是否维持背景结构。",
    "limitation": "摘要未给出被试规模、绝对指标及严格跨被试或跨视频划分，需全文核查。视觉双流的架构类比并不建立生物机制对应或因果证据；生成器先验可能补全未被脑信号约束的运动和细节。"
  },
  {
    "id": "follow-your-mind",
    "conference": "ECCV",
    "year": 2026,
    "level": "A",
    "title": "Follow-Your-Mind: Towards Inversion-Free Brain-Driven Visual Context Synthesis and Editing",
    "authors": "Haodong Jing, Panqi Yang, Rongchao Zhang, Zhipeng Liu, Yajun Liu, Xuehai Bai, Yongqiang Ma, Nanning Zheng",
    "source": "ECCV 2026 主会 · Springer 正式论文集 · 2026-10-04 在线发表",
    "href": "https://link.springer.com/chapter/10.1007/978-3-032-37083-9_31",
    "tags": [
      "脑信号",
      "可控生成",
      "视觉编辑",
      "Rectified Flow",
      "统一编解码"
    ],
    "introZh": "以 MinD-Flow 将脑信号语义桥接到生成潜空间，在无需噪声反演的条件下统一视觉合成与局部编辑。",
    "abstractZh": "通过脑信号解读人类视觉意图并操纵视觉内容，是神经生成式人工智能的一个重要里程碑。近期研究已经展示了令人瞩目的脑活动图像重建能力，但往往依赖缓慢的迭代扩散反演过程，难以实现实时编辑，也未能将生成与精确上下文修改统一起来。Rectified Flow 最近成为快速、确定性生成的一种有力解决方案。受此启发，我们提出 MinD-Flow，一种用于统一脑驱动合成与编辑、无需反演的新框架。该框架引入 Neuro-aware Encoder，对异质脑信号进行统一编码，并结合 Neuro-Perceiver Bridge（NPB），使脑语义与视觉锚点对齐，将“思维空间”映射到生成潜空间。此外，解耦流引导（DFG）与自适应软掩膜克服了结构保持与语义变化之间的冲突，实现无需噪声反演的精确局部编辑。我们提出 Brain-Gen Benchmark，标准化神经上下文、创造与编辑任务的评估。全面实验显示了作者所报告的先进性能，为脑机接口应用提供了一种多用途工具。",
    "relevance": "论文事实：论文通过脑信号编码、语义桥接、解耦流引导和软掩膜，把合成与局部编辑放在同一框架内。研究推断：适合参考你的脑信号条件生成与目标移除实验：把目标语义改变、非目标背景保持、编辑定位与神经证据贡献拆成独立评价。",
    "limitation": "公开摘要未说明异质脑信号的具体组成、各模态样本量、被试划分和推理延迟，不能仅凭“统一”或“快速”宣称任意模态泛化与实时 BCI。局部编辑的结构保持也可能主要来自视觉锚点和生成器，需要零脑信号、错误脑信号及仅视觉输入对照。"
  },
  {
    "id": "mind2cloud",
    "conference": "ECCV",
    "year": 2026,
    "level": "A",
    "title": "Mind2Cloud: EEG-to-Point Cloud Generation with Two-Granularity Diffusion Decoding",
    "authors": "Yongyi Lu, Xiongfeng Huang, Zhijing Yang",
    "source": "ECCV 2026 主会 · Springer 正式论文集 · 2026-09-18 在线发表",
    "href": "https://link.springer.com/chapter/10.1007/978-3-032-37032-7_6",
    "preprint": "https://arxiv.org/abs/2609.13991",
    "tags": [
      "EEG",
      "脑到三维",
      "点云生成",
      "扩散模型",
      "粗到细解码"
    ],
    "introZh": "用随扩散时间步变化的 Transformer 与 Point-Voxel CNN 融合策略，从 EEG 先恢复整体结构，再细化点云几何。",
    "abstractZh": "从脑信号重建三维物体，为理解人类视觉认知提供了一条有前景的途径。尽管既有工作已在利用 EEG 信号进行三维重建方面取得初步成功，现有方法通常使用统一的扩散解码器，忽略了 EEG 表征与扩散去噪过程各自不断变化的语义粒度。本文提出 Mind2Cloud，一种基于双粒度扩散解码的新型 EEG 到点云生成框架。其核心是一个时间感知解码器，通过可学习融合掩膜，在扩散时间步之间整合全局 Transformer 分支与局部 Point-Voxel CNN（PVCNN）分支。具体而言，在较早的上采样阶段加入 Transformer 层，以在高不确定性下捕捉物体的全局结构；在较晚阶段使用 PVCNN 模块，细化局部几何细节。受 EEG 视觉表征层次性的启发，该设计使空间粒度随扩散去噪的粗到细轨迹动态调整。我们进一步引入对抗细化模块，增强几何真实性与语义一致性。在 EEG-3D 数据集全部 12 名被试上的全面实验表明，Mind2Cloud 在几何准确性与语义对齐方面均优于已有工作，为 EEG 到点云生成建立了新的基准。源代码公开于 https://github.com/duasoi/Mind2Cloud。",
    "relevance": "论文事实：模型以 EEG 为条件生成三维点云，并在 12 名被试上比较全局结构与局部几何质量。研究推断：双粒度生成可用于分离共享语义核心与模态特异细节，进一步比较 EEG 时间信息与 fMRI 空间信息是否分别约束几何的不同层次。",
    "limitation": "“全部 12 名被试”不等于严格留一被试泛化，需核查训练测试协议和类别是否独立。点云几何与语义指标改善不证明恢复了连续真实视觉经验；生成器及数据集形状先验的贡献需与零 EEG、错误 EEG 和仅类别条件比较。"
  },
  {
    "id": "mind-to-face",
    "conference": "ECCV",
    "year": 2026,
    "level": "A",
    "title": "Mind-to-Face: Neural-Driven Photorealistic Avatar Synthesis via EEG Decoding",
    "authors": "Haolin Xiong, Tianwen Fu, Pratusha Bhuvana Prasad, Yunxuan Cai, Wenbin Teng, Haiwei Chen, Hanyuan Xiao, Yajie Zhao",
    "source": "ECCV 2026 主会 · Springer 正式论文集 · 2026-10-03 在线发表",
    "href": "https://link.springer.com/chapter/10.1007/978-3-032-37152-2_17",
    "preprint": "https://arxiv.org/abs/2512.04313",
    "tags": [
      "EEG",
      "神经条件生成",
      "三维表情",
      "数字人",
      "3D Gaussian Splatting"
    ],
    "introZh": "将 EEG 映射为密集三维面部位置图，并通过 3D Gaussian Splatting 渲染动态表情数字人，属于神经信号驱动生成。",
    "abstractZh": "当前富有表现力的数字人系统高度依赖视觉线索，当面部被遮挡或情绪没有外显时往往失效。我们提出 Mind-to-Face，这是首个直接将非侵入式脑电（EEG）信号解码为高保真面部表情的框架。我们建立双模态记录系统，在情绪诱发刺激期间同步采集 EEG 与多视角面部视频，为神经到视觉学习提供精确监督。模型使用 CNN–Transformer 编码器，将 EEG 映射到采样超过 6.5 万个顶点的密集三维位置图，捕捉精细几何与细微情绪动态，再通过修改后的 3D Gaussian Splatting 管线渲染，获得照片级真实且视角一致的结果。全面评估表明，仅用 EEG 就能可靠预测动态、被试特异的面部表情，包括细微情绪反应，提示神经信号包含比既有认识更丰富的情感与几何信息。Mind-to-Face 为神经驱动数字人建立了新范式，支持沉浸式环境中的个性化、情绪感知远程临场与认知交互。",
    "relevance": "论文事实：研究把同步 EEG–多视角视频用于三维表情监督，输出连续几何与渲染结果，而不是普通情绪类别。研究推断：可借鉴其“神经编码→可解释几何→生成渲染”分层条件设计，检验共享潜变量能否保留身份与动态属性，同时独立量化脑信号对输出的贡献。",
    "limitation": "面部表情同步发生时，头皮记录可能混入面部肌电和眼动；摘要未证明这些因素已被充分排除，因此不能仅凭高保真数字人宣称识别了内部情绪。被试特异预测不等于新被试迁移，也不等于纯想象表情控制，需要严格伪迹、未来时间段和跨被试对照。"
  }
];
