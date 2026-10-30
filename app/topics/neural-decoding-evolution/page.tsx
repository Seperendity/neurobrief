import Link from "next/link";
import { ThemeToggle } from "../../theme-toggle";
import { frontiers, readingRoutes, reference, unificationRows } from "./evolution-data";

const stages = [
  {
    period: "2005–2011",
    title: "从“能否读出”到可计算的编码模型",
    summary: "早期工作把脑解码从单脑区平均激活推进到多体素模式分析：模型开始利用分布式活动识别视觉内容。随后，编码模型反过来预测自然刺激引起的脑响应，并通过候选刺激反演出观看内容。研究目标仍以分类、识别和粗粒度重建为主，但“编码—解码双向建模”的基本范式已经形成。",
    shift: "关键转折：从相关脑区定位，转向学习可泛化的刺激—脑响应映射。",
    papers: [
      { title: "Decoding the visual and subjective contents of the human brain (2005)", href: "https://www.nature.com/articles/nn1444" },
      { title: "Reconstructing Visual Experiences from Brain Activity Evoked by Natural Movies (2011)", href: "https://www.cell.com/current-biology/fulltext/S0960-9822(11)00937-7" },
    ],
  },
  {
    period: "2017–2021",
    title: "深度网络成为脑表征的中介坐标系",
    summary: "卷积神经网络把图像分解为从边缘、形状到类别语义的层级特征，使研究者能够把视觉皮层层级与人工模型层级逐层对齐。解码器不再只预测标签，而是预测深度特征，再借助优化或生成网络恢复看见与想象的图像。训练好的任务模型也开始被用来比较脑区功能，脑解码与机制发现由此汇合。",
    shift: "关键转折：输出空间从有限类别，扩展为可重建、可比较的高维表征。",
    papers: [
      { title: "Generic decoding of seen and imagined objects using hierarchical visual features (2017)", href: "https://www.nature.com/articles/ncomms15037" },
      { title: "Deep image reconstruction from human brain activity (2019)", href: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1006633" },
      { title: "Unveiling functions of the visual cortex using task-specific deep neural networks (2021)", href: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009267" },
    ],
  },
  {
    period: "2022–2023",
    title: "CLIP、语言模型与扩散模型重塑生成式脑解码",
    summary: "预训练视觉—语言模型提供跨类别语义空间，扩散模型把神经预测的条件转化为高保真图像。fMRI、MEG 和 EEG 开始对齐 CLIP、语音或语言模型表征；候选刺激检索与连续语言重建等不同任务并行发展。生成结果的自然度显著提升，但检索正确、生成流畅和忠实恢复神经内容仍是不同能力，强生成先验也可能掩盖脑信号的实际贡献。",
    shift: "关键转折：脑模型从直接生成像素，转向预测基础模型潜变量并控制生成器。",
    papers: [
      { title: "High-Resolution Image Reconstruction With Latent Diffusion Models From Human Brain Activity (2023)", href: "https://openaccess.thecvf.com/content/CVPR2023/html/Takagi_High-Resolution_Image_Reconstruction_With_Latent_Diffusion_Models_From_Human_Brain_CVPR_2023_paper.html" },
      { title: "Semantic reconstruction of continuous language from non-invasive brain recordings (2023)", href: "https://www.nature.com/articles/s41593-023-01304-9" },
      { title: "Decoding speech perception from non-invasive brain recordings (2023)", href: "https://www.nature.com/articles/s42256-023-00714-5" },
    ],
  },
  {
    period: "2024–2025",
    title: "基础模型、跨被试共享空间与数据规模化",
    summary: "研究重点开始从“为一个被试训练一个解码器”转向大规模预训练、跨数据集迁移和少样本适配。BrainLM 等工作验证了在数千小时 fMRI 上学习通用动态表征的可行性；跨被试方法则尝试把个体脑空间映射到共享表示，再保留被试特异的适配分支。与此同时，EEG 基础模型和脑—语言统一建模快速发展，但不同设备、通道布局、任务和采样协议仍使真正统一十分困难。",
    shift: "关键转折：从单任务、单被试模型，转向预训练主干 + 共享空间 + 个体适配。",
    papers: [
      { title: "BrainLM: A foundation model for brain activity recordings (ICLR 2024)", href: "https://openreview.net/forum?id=RwI7ZEfR27" },
      { title: "MindBridge: A Cross-Subject Brain Decoding Framework (CVPR 2024)", href: "https://openaccess.thecvf.com/content/CVPR2024/html/Wang_MindBridge_A_Cross-Subject_Brain_Decoding_Framework_CVPR_2024_paper.html" },
      { title: "Inter-individual and inter-site neural code conversion (2025)", href: "https://www.nature.com/articles/s43588-025-00826-5" },
    ],
  },
  {
    period: "2026 · 截至 10 月",
    title: "统一表征开始落地，验证标准同步升级",
    summary: "2026 年的进展呈现多条并行路线：空间感知的 fMRI 表征、共享功能与个体适配、结构化生成条件、多脑模态预训练，以及自然情境动力学。NeuroFlow 等连接双向编解码，Brain-OF 联合不同脑信号，BrainVista 等扩展连续时间预测；它们统一的对象并不相同。与此同时，跨 ROI 关系、个人感知对齐与选择性模型操控，使评价从一个预测分数走向更具体的科学假设。",
    shift: "关键转折：共同模型与更强生成器开始出现，但泛化、神经信息贡献和机制解释必须分别验证。",
    papers: [
      reference("CVPR", "neuroflow", "NeuroFlow"),
      reference("NeurIPS", "neurips-2026-155505", "Brain-OF"),
      reference("ICLR", "iclr2026-only-brains-align", "APA"),
    ],
  },
];

const bottlenecks = [
  ["推理时还输入了什么？", "MindVLM 推理需要测试图像；仅脑信号、脑＋图像、脑＋候选文本的结果不能直接比较。先明确输出是检索、生成，还是对视觉证据的选择。"],
  ["新被试究竟提供了多少信息？", "区分梯度微调、上下文样例、目标统计与完全零目标数据。被试留出、刺激留出、session 留出和站点留出是不同泛化轴。"],
  ["缺失恢复保住了什么？", "信号重建误差降低，并不保证物体身份、语义或关键局部信息仍可解码。恢复质量需与冻结解码器的内容表现共同报告。"],
  ["目标空间改变了结论吗？", "个人感知对齐可能牺牲神经预测；语言模型深层检索也可能更多反映篇章而非词身份。应控制目标层级、文本构造和指标所测内容。"],
  ["时间预测是否真的外推？", "明确可用刺激、血流动力学延迟、因果窗口和滚动跨度。相邻时间点随机划分与未来 session 测试，不是同样严格的验证。"],
  ["干预发生在模型还是大脑？", "ROI 消融、潜变量擦除与反事实刺激首先检验模型。要支持真实神经机制，还需独立刺激、被试及真实神经测量的验证。"],
];

const forecasts = [
  { level: "待验证", title: "共享语义与个体映射能否独立迁移？", text: "在相同主干和刺激划分下，对比功能簇、张量残差、低秩适配和上下文学习；测量校准样本量，而不是只比较最终分数。" },
  { level: "待验证", title: "任意模态子集能否维持内容解码？", text: "分别遮挡模态与局部脑区，用信号保真、语义可读性和不确定性共同评估；联合预训练本身不足以回答这个问题。" },
  { level: "待验证", title: "生成器中的神经条件是否具有选择性？", text: "在固定生成预算下改变某个物体、属性或 ROI 条件，同时评价目标变化与非目标保持；比较零脑、错误脑及仅刺激条件。" },
  { level: "长期目标", title: "模型提出的机制假设能否回到实验？", text: "编码器提出候选刺激与响应差异，解码器检验内容一致性，再以独立真实脑数据验证。双向一致只能作为中间证据，不能代替实验。" },
];

export default function NeuralDecodingEvolutionPage() {
  return (
    <main className="conferencePage developmentPage">
      <header className="topbar">
        <div className="topbarInner">
          <Link className="brand brandLink" href="/"><span className="brandmark">N</span><div><strong>NeuroDecode Brief</strong><small>脑解码论文简报</small></div></Link>
          <nav className="topnav" aria-label="专题导航"><Link href="/topics/neural-decoding-evolution" aria-current="page">领域发展</Link><a href="#frontiers">2026 进展</a><a href="#reading-route">阅读路线</a><Link href="/#venues">全部专题</Link></nav>
          <div className="headerActions"><ThemeToggle /><Link className="backLink" href="/">← 返回简报首页</Link></div>
        </div>
      </header>

      <div className="conferencePageShell developmentShell">
        <nav className="breadcrumb" aria-label="面包屑"><Link href="/">专题阅读</Link><span>/</span><strong>统一多模态脑编解码：领域发展</strong></nav>

        <section className="conferenceHero developmentHero">
          <div>
            <p className="eyebrow">FIELD EVOLUTION · 2005–2026</p>
            <h1>统一多模态脑编解码<br />如何走到今天</h1>
            <p>从有限类别识别，到共享表征与条件生成，再到跨被试、多脑模态和可检验的神经科学假设。结合站内简报、Nature 与五场顶会文献，梳理已经发生的进展，以及尚未跨越的证据边界。</p>
          </div>
          <div className="conferenceCount"><strong>5</strong><span>个历史阶段 · 6 条当前主线</span><small>基于站内已收录文献<br />更新：2026 年 10 月 20 日</small></div>
        </section>

        <section className="conferenceScope">
          <div><strong>核心对象</strong><span>fMRI、EEG、MEG、ECoG 与图像、文本、音频、视频</span></div>
          <div><strong>核心问题</strong><span>统一到哪一层、如何泛化、神经条件是否有效、机制证据是否充分</span></div>
          <div><strong>阅读口径</strong><span>历史演进与同期路线分开；论文事实、证据边界和研究判断分开</span></div>
        </section>

        <section className="developmentThesis">
          <p className="eyebrow">THE CENTRAL SHIFT</p>
          <h2>这个领域真正发生了什么变化？</h2>
          <div className="thesisGrid">
            <div><span>01</span><strong>任务</strong><p>从类别识别扩展到候选检索与条件生成。图像、语言、视频和三维输出丰富了，但开放程度需逐项核实。</p></div>
            <div><span>02</span><strong>表征</strong><p>从手工特征与标签，发展为 DNN、CLIP、语音模型和 LLM 提供的共享潜空间。</p></div>
            <div><span>03</span><strong>泛化</strong><p>从每名被试独立训练，走向共享结构与个体适配。零样本、少样本和免参数更新仍是不同条件。</p></div>
            <div><span>04</span><strong>科学目标</strong><p>从单一预测分数走向表征结构、选择性模型操控和实验闭环。能够预测，不等于已经解释机制。</p></div>
          </div>
        </section>

        <section className="developmentTimeline" aria-labelledby="timeline-title">
          <div className="developmentSectionHeading"><p className="eyebrow">FIVE STAGES</p><h2 id="timeline-title">五个阶段，看懂技术主线</h2></div>
          <div className="timelineList">
            {stages.map((stage, index) => (
              <article className="timelineStage" key={stage.period}>
                <div className="timelineRail"><strong>{String(index + 1).padStart(2, "0")}</strong><span /></div>
                <div className="timelineBody">
                  <p className="timelinePeriod">{stage.period}</p>
                  <h3>{stage.title}</h3>
                  <p className="timelineSummary">{stage.summary}</p>
                  <p className="timelineShift">{stage.shift}</p>
                  <div className="timelineSources">
                    <strong>代表工作</strong>
                    {stage.papers.map((paper) => paper.href.startsWith("/") ? <Link key={paper.title} href={paper.href}>{paper.title}<span>→</span></Link> : <a key={paper.title} href={paper.href} target="_blank" rel="noreferrer">{paper.title}<span>↗</span></a>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="frontierSection" id="frontiers" aria-labelledby="frontier-title">
          <div className="developmentSectionHeading"><p className="eyebrow">2026 · SIX PARALLEL DIRECTIONS</p><h2 id="frontier-title">当前进展：六条并行主线</h2><p className="developmentLead">这些是同期互补的研究路线，并非后一条已经取代前一条。代表论文可进入站内阅读全文导读与完整中文摘要。</p></div>
          <div className="frontierGrid">{frontiers.map((item, index) => <article className="frontierCard" key={item.id}>
            <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p><h3>{item.title}</h3>
            <div><strong>事实依据</strong><p>{item.finding}</p></div>
            <div className="frontierBoundary"><strong>证据边界</strong><p>{item.boundary}</p></div>
            <div><strong>研究判断 · 下一问</strong><p>{item.question}</p></div>
            <div className="frontierSources" aria-label="代表论文">{item.papers.map((paper) => <Link key={paper.href} href={paper.href} title={paper.title}>{paper.label}<span>→</span></Link>)}</div>
          </article>)}</div>
        </section>

        <section className="unificationSection" aria-labelledby="unification-title">
          <div className="developmentSectionHeading"><p className="eyebrow">WHAT DOES “UNIFIED” MEAN?</p><h2 id="unification-title">先看“统一”的对象，再比较能力</h2></div>
          <div className="unificationTableWrap"><table className="unificationTable">
            <thead><tr><th scope="col">统一的层次</th><th scope="col">已有工作在做什么</th><th scope="col">不能由此直接推出</th></tr></thead>
            <tbody>{unificationRows.map((row) => <tr key={row.kind}><th scope="row">{row.kind}<div>{row.papers.map((paper) => <Link key={paper.href} href={paper.href} title={paper.title}>{paper.label} →</Link>)}</div></th><td>{row.evidence}</td><td>{row.limit}</td></tr>)}</tbody>
          </table></div>
        </section>

        <section className="architectureSection">
          <div className="developmentSectionHeading"><p className="eyebrow">COMPOSABLE DESIGN · RESEARCH SYNTHESIS</p><h2>现有工作提供的可组合设计</h2></div>
          <div className="architectureFlow" aria-label="统一多模态脑编解码架构">
            <div><span>输入层</span><strong>多种脑信号</strong><p>fMRI · EEG · MEG · ECoG</p></div>
            <i>→</i>
            <div><span>特异结构</span><strong>时空与个体接口</strong><p>原生坐标 · 功能簇 · 时间尺度 · 个体残差</p></div>
            <i>→</i>
            <div><span>共享结构</span><strong>可迁移表征</strong><p>语义 · 感知 · 上下文 · 动态</p></div>
            <i>→</i>
            <div><span>任务与检验</span><strong>编解码及独立验证</strong><p>重建 · 预测 · 编辑 · 真实脑测量</p></div>
          </div>
          <p className="architectureNote">研究判断：上图是从现有论文归纳的设计空间，不是已经确立的唯一架构。连续响应场、SSM、Transformer、流匹配、自回归与 MoE 仍在并行探索。共享表征是否真的承载跨模态语义，必须用独立任务和缺失条件检验。</p>
        </section>

        <section className="bottleneckSection">
          <div className="developmentSectionHeading"><p className="eyebrow">SIX QUESTIONS FOR A NEW PAPER</p><h2>读一篇新论文，先问六个问题</h2></div>
          <div className="bottleneckGrid">
            {bottlenecks.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="forecastSection">
          <div className="developmentSectionHeading"><p className="eyebrow">TESTABLE NEXT STEPS</p><h2>下一步，怎样把方向变成实验</h2><p className="developmentLead">以下为基于文献的研究判断，尚不是这些论文已经共同证明的能力。</p></div>
          <div className="forecastList">
            {forecasts.map((item) => <article key={item.title}><span>{item.level}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
          </div>
        </section>

        <section className="evolutionReadingSection" id="reading-route" aria-labelledby="reading-route-title">
          <div className="developmentSectionHeading"><p className="eyebrow">A READING ROUTE</p><h2 id="reading-route-title">从建模到验证的阅读顺序</h2></div>
          <div className="forecastList">{readingRoutes.map((route, index) => <article key={route.title}><span>0{index + 1}</span><div><h3>{route.title}</h3><p>{route.text}</p><div className="evolutionReadingLinks">{route.papers.map((paper) => <Link key={paper.href} href={paper.href} title={paper.title}>{paper.label} →</Link>)}</div></div></article>)}</div>
        </section>

        <section className="conferenceMethodNote developmentNote">
          <p className="eyebrow">EDITORIAL NOTE</p>
          <h2>如何使用这个专题</h2>
          <p>本页基于站内已收录的 CVPR、ICML、ICLR、NeurIPS、ECCV 2026、Nature Portfolio 与日常简报整理，属于编辑性方法综述，不宣称穷尽所有研究。会议论文、期刊论文与预印本的身份保留在各论文页；“研究判断”用于提出可验证问题。专题仅按明确要求维护，不随日常简报自动改动。</p>
        </section>
      </div>

      <footer>NeuroDecode Brief · 统一多模态脑编解码领域发展专题</footer>
    </main>
  );
}
