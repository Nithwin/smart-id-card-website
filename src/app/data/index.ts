import {
  Aperture,
  Crosshair,
  Eye,
  LineChart,
  ScanFace,
  Send,
  ShieldCheck,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Nav ───────────────────────────────────────────────── */
export const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "Overview",     href: "#overview" },
  { label: "Modules",      href: "#modules" },
  { label: "CA-YOLO",      href: "#ca-yolo" },
  { label: "Metrics",      href: "#metrics" },
  { label: "Benchmarks",   href: "#benchmarks" },
  { label: "Team",         href: "#team" },
  { label: "Timeline",     href: "#timeline" },
];

/* ─── Horizontal milestone panels (problem → delivery) ─ */
export interface StoryPanel {
  id:     string;
  kicker: string;
  title:  string;
  body:   string;
  /** Visual identity: glyph name resolved in ProjectStory.tsx */
  glyph:  "campus" | "yolo" | "attention" | "face" | "alert";
  /** Tone color for the panel (CSS var or hex). */
  tone:   string;
}

export const storyPanels: StoryPanel[] = [
  {
    id:     "01",
    kicker: "Problem",
    title:  "Busy corridors. Missed ID cards.",
    body:   "Every college expects students to wear an ID, but no one can watch every gate, corridor, and canteen line all day. So when a card is missing, it is often noticed late.",
    glyph:  "campus",
    tone:   "var(--accent-3)",
  },
  {
    id:     "02",
    kicker: "Detection",
    title:  "One model, two questions per frame.",
    body:   "Built on YOLOv8, each frame answers two simple questions: is there a person, and is an ID card visible on them? That gives us a fast baseline we can improve without losing real-time performance.",
    glyph:  "yolo",
    tone:   "var(--text-primary)",
  },
  {
    id:     "03",
    kicker: "CA-YOLOv8",
    title:  "We taught it to look closer.",
    body:   "We added CBAM and Coordinate Attention so the model focuses better on people and small card regions. A custom P2 head helps catch tiny cards on lanyards, and Wise-IoU keeps training stable on noisy real scenes.",
    glyph:  "attention",
    tone:   "var(--accent-2)",
  },
  {
    id:     "04",
    kicker: "InsightFace",
    title:  "Who is in the frame?",
    body:   "If the system decides no ID is visible, it captures the frame, crops the face, and runs InsightFace against an enrolled gallery. A name is attached only when the match confidence is strong enough.",
    glyph:  "face",
    tone:   "var(--accent)",
  },
  {
    id:     "05",
    kicker: "Delivery",
    title:  "A clean packet to the right desk.",
    body:   "FastAPI connects the full flow: streaming, detection, identity lookup, and incident logging. Instead of spamming raw frames, staff receive one clear incident with time, snapshot, match score, and student details.",
    glyph:  "alert",
    tone:   "var(--text-primary)",
  },
];

/* ─── Hero stats ────────────────────────────────────────── */
export const heroStats: [string, string][] = [
  ["98.6%",    "mAP@50"],
  ["89 FPS",   "GPU Inference (T4)"],
  ["10-Stage", "Deep Pipeline"],
  ["3 Custom", "Module Upgrades"],
];

/* ─── Overview quick facts ──────────────────────────────── */
export const overviewFacts: [string, string][] = [
  ["Problem",    "In busy campus spaces, missing IDs are easy to miss manually"],
  ["Approach",   "Detect person + card, flag no-ID cases, identify face, notify staff"],
  ["Dataset",    "Campus-like video data labeled for person, card, and no-card cases"],
  ["Deployment", "FastAPI backend + web dashboard with evidence-first incident alerts"],
];

/* ─── Project modules ───────────────────────────────────── */
export interface ProjectModule {
  title:       string;
  description: string;
  icon:        LucideIcon;
  color:       string;
  bg:          string;
  border:      string;
}

export const projectModules: ProjectModule[] = [
  {
    title: "Live stream ingest",
    description: "Reads CCTV or classroom video frame by frame, prepares each frame, then sends it to detection.",
    icon: Video,
    color: "text-sky-600 dark:text-sky-400",
    bg:    "bg-sky-50 dark:bg-sky-900/25",
    border: "border-sky-200 dark:border-sky-700/50",
  },
  {
    title: "CA-YOLO detection",
    description: "In one pass, the model finds people and visible ID cards, including small cards with our P2 head upgrade.",
    icon: Eye,
    color: "text-indigo-600 dark:text-indigo-400",
    bg:    "bg-indigo-50 dark:bg-indigo-900/25",
    border: "border-indigo-200 dark:border-indigo-700/50",
  },
  {
    title: "No-ID violation rules",
    description: "Simple geometry rules decide if the ID is not visible (for example, no card on the person region).",
    icon: Crosshair,
    color: "text-violet-600 dark:text-violet-400",
    bg:    "bg-violet-50 dark:bg-violet-900/25",
    border: "border-violet-200 dark:border-violet-700/50",
  },
  {
    title: "Evidence capture",
    description: "When a violation is found, the system stores a clear snapshot with timestamp and bounding-box metadata.",
    icon: Aperture,
    color: "text-amber-600 dark:text-amber-400",
    bg:    "bg-amber-50 dark:bg-amber-900/25",
    border: "border-amber-200 dark:border-amber-700/50",
  },
  {
    title: "InsightFace identification",
    description: "InsightFace converts the face to embeddings and matches it against enrolled students to answer who is in frame.",
    icon: ScanFace,
    color: "text-emerald-600 dark:text-emerald-400",
    bg:    "bg-emerald-50 dark:bg-emerald-900/25",
    border: "border-emerald-200 dark:border-emerald-700/50",
  },
  {
    title: "HOD / Principal alert",
    description: "Sends a structured alert with student details, confidence score, timestamp, and snapshot to HOD or Principal.",
    icon: Send,
    color: "text-rose-600 dark:text-rose-400",
    bg:    "bg-rose-50 dark:bg-rose-900/25",
    border: "border-rose-200 dark:border-rose-700/50",
  },
  {
    title: "Dedup & audit log",
    description: "Uses cooldown windows and SQLite logs so staff get clean incidents, not repeated spam alerts.",
    icon: ShieldCheck,
    color: "text-cyan-600 dark:text-cyan-400",
    bg:    "bg-cyan-50 dark:bg-cyan-900/25",
    border: "border-cyan-200 dark:border-cyan-700/50",
  },
  {
    title: "Operations dashboard",
    description: "Provides live view, incident history, and export-friendly summaries for administrators.",
    icon: LineChart,
    color: "text-purple-600 dark:text-purple-400",
    bg:    "bg-purple-50 dark:bg-purple-900/25",
    border: "border-purple-200 dark:border-purple-700/50",
  },
];

/* ─── CA-YOLO stages ────────────────────────────────────── */
export interface CaYoloStage {
  title:    string;
  color:    string;
  narration: string;
}

export const caYoloStages: CaYoloStage[] = [
  {
    title: "Input Preprocessing", color: "bg-cyan-500",
    narration: "Resize camera image to 640×640 and split into RGB channels so the model reads a consistent, structured input regardless of source resolution.",
  },
  {
    title: "Convolutional Features", color: "bg-indigo-500",
    narration: "Sliding convolution filters extract edges, corners, and textures; downsampling at each step preserves meaningful patterns while reducing resolution.",
  },
  {
    title: "C2f Bottleneck", color: "bg-violet-500",
    narration: "Feature maps split and merge through shortcut and deep paths, preserving the original signal while simultaneously learning richer, abstract context.",
  },
  {
    title: "SPPF Pooling", color: "bg-purple-500",
    narration: "Three back-to-back pooling operations expand the receptive field so the detector understands both tight detail and full-scene context at once.",
  },
  {
    title: "CBAM Attention ★", color: "bg-amber-500",
    narration: "Channel attention asks what features matter most; spatial attention creates a heatmap of where to look. Together they act like a spotlight for ID-card cues.",
  },
  {
    title: "Coordinate Attention ★", color: "bg-orange-500",
    narration: "Directional encoding scans horizontally and vertically separately — like X/Y map coordinates — pinpointing exact person-card positions with greater precision.",
  },
  {
    title: "PANet Neck Fusion", color: "bg-emerald-500",
    narration: "Features flow upward adding fine detail then back downward adding context — combining close-up and wide-angle understanding into one rich feature map.",
  },
  {
    title: "P2 Micro-Head ★", color: "bg-lime-500",
    narration: "A fourth 160×160 detection head — our custom upgrade — catches tiny ID cards on belts or lanyards that standard 3-head YOLO would miss entirely.",
  },
  {
    title: "Decoupled Head", color: "bg-teal-500",
    narration: "Separate classification and regression branches each specialise: one answers 'what is this?' the other 'exactly where?', improving both simultaneously.",
  },
  {
    title: "Final Output", color: "bg-rose-500",
    narration: "NMS filters overlapping boxes. Verdict: ID worn (person + card) or violation (no visible card → capture frame → InsightFace ID → notify HOD / Principal).",
  },
];

/* ─── Architecture flow ─────────────────────────────────── */
export const architectureFlow = [
  { step: "01", label: "Frame stream",      desc: "Live campus feed at 18+ FPS",           color: "border-l-sky-500" },
  { step: "02", label: "Preprocess",        desc: "Resize, normalise, channel split",      color: "border-l-indigo-500" },
  { step: "03", label: "CA-YOLO",           desc: "Detect every person + visible ID card", color: "border-l-violet-500" },
  { step: "04", label: "No-ID check",       desc: "Spatial rules — no card on student?",   color: "border-l-amber-500" },
  { step: "05", label: "InsightFace",       desc: "Match face to enrolled gallery",        color: "border-l-emerald-500" },
  { step: "06", label: "Staff escalation",  desc: "Student details + evidence to HOD / Principal", color: "border-l-rose-500" },
];

/* ─── Metrics — real results from 100-epoch CA-YOLOv8m run ─────────── */
/*
 * Validation set: 392 images, 815 instances (28 batches)
 * Hardware: Tesla T4 (14 GB), trained on Google Colab
 * Speed: 0.3 ms preprocess · 11.2 ms inference · 1.9 ms postprocess
 */
export const metrics = [
  { label: "mAP@50 (all)",      value: "98.6%",  sub: "All classes · 392-image val set",       color: "text-cyan-600 dark:text-cyan-400" },
  { label: "mAP@50 (card)",     value: "98.0%",  sub: "ID card class · P 0.959 · R 0.963",     color: "text-indigo-600 dark:text-indigo-400" },
  { label: "mAP@50 (person)",   value: "99.1%",  sub: "Person class · P 0.989 · R 0.966",      color: "text-violet-600 dark:text-violet-400" },
  { label: "F1 peak",           value: "97.0%",  sub: "All classes at conf 0.399",              color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Inference latency", value: "11.2ms", sub: "Per frame · Tesla T4 GPU",               color: "text-amber-600 dark:text-amber-400" },
  { label: "Training time",     value: "3.9 hr", sub: "100 epochs · 25.8M params · 78.7 GFLOPs", color: "text-rose-600 dark:text-rose-400" },
];

export const metricBars = [
  { name: "mAP@50   (all)",    value: 98.6, from: "#06b6d4", to: "#3b82f6" },
  { name: "mAP@50   (person)", value: 99.1, from: "#6366f1", to: "#a855f7" },
  { name: "mAP@50   (card)",   value: 98.0, from: "#10b981", to: "#14b8a6" },
  { name: "mAP50-95 (all)",    value: 85.0, from: "#f59e0b", to: "#f97316" },
  { name: "Precision (all)",   value: 97.4, from: "#ec4899", to: "#f43f5e" },
  { name: "Recall    (all)",   value: 96.4, from: "#8b5cf6", to: "#6366f1" },
];

/* mAP@50 sampled at epochs 1, 5, 10, 20, 30, 40, 50, 75, 100 */
export const trainingCurve = [60, 75, 85, 92, 95, 96.2, 97.1, 97.8, 98.6];

/* ─── Tech stack ────────────────────────────────────────── */
export const techStack = [
  { name: "Python + PyTorch",        icon: "⚙️", desc: "Train CA-YOLO & run inference" },
  { name: "YOLOv8 + Custom Modules", icon: "🔬", desc: "CBAM, CoordAttn, P2 head for small-card reliability" },
  { name: "OpenCV",                  icon: "👁️", desc: "Video I/O, crops, and frame prep only" },
  { name: "InsightFace",             icon: "🧠", desc: "ArcFace embeddings — who is the student?" },
  { name: "Next.js + Tailwind CSS",  icon: "🌐", desc: "Admin dashboard & this showcase site" },
  { name: "FastAPI + SQLite",        icon: "⚡", desc: "Alerts, streams, incidents, staff routing" },
];

/* ─── Timeline ──────────────────────────────────────────── */
export const timeline = [
  { phase: "Phase 1", weeks: "Wk 1–2",   label: "Problem Definition",  desc: "Literature review, dataset scoping, and requirement planning",                 color: "bg-sky-500" },
  { phase: "Phase 2", weeks: "Wk 3–5",   label: "Dataset & Annotation", desc: "ID-card dataset collection, CVAT annotation, augmentation strategy",          color: "bg-indigo-500" },
  { phase: "Phase 3", weeks: "Wk 6–8",   label: "Model Training",       desc: "Baseline YOLOv8, CBAM + CoordAttn integration, hyperparameter tuning",        color: "bg-violet-500" },
  { phase: "Phase 4", weeks: "Wk 9–10",  label: "Backend + alerts",     desc: "Violation logic, InsightFace gallery match, evidence store, HOD / Principal payloads", color: "bg-amber-500" },
  { phase: "Phase 5", weeks: "Wk 11–12", label: "Dashboard & docs",     desc: "Operator dashboard, this showcase site, and the report — written so anyone can follow the system end-to-end", color: "bg-emerald-500" },
];

/* ─── Team ──────────────────────────────────────────────── */
export interface TeamMember {
  name:          string;
  initials:      string;
  /** Public URL under /public/team — e.g. /team/Nithwin.jpeg */
  photo:         string;
  role:          string;
  shortRole:     string;
  contributions: string[];
  highlights:    { label: string; value: string }[];
  accent:        string;
}

export const team: TeamMember[] = [
  {
    name:      "Nithwin",
    initials:  "NI",
    photo:     "/team/Nithwin.jpeg",
    role:      "AI / ML Core & Architecture Lead",
    shortRole: "Model Architect",
    contributions: [
      "Architected the CA-YOLOv8 model — custom YOLOv8 enhanced with CBAM and Coordinate Attention",
      "Wrote attention.py — Channel Attention, Spatial Attention, full CBAM, and Coord-Attn modules in PyTorch",
      "Designed YAML configs (ca_yolov8.yaml, ca_yolov8_p2.yaml) defining attention placement in backbone + neck",
      "Built the interactive Next.js architecture visualizer with Framer Motion",
      "Replaced CIoU loss with Wise-IoU dynamic non-monotonic focusing for low-quality boxes",
      "Set up Colab training, hyperparameters, and produced final best.pt weights",
    ],
    highlights: [
      { label: "CBAM Block",    value: "Channel + Spatial after every C2f"   },
      { label: "Coord-Attn",    value: "Directional 1D pooling H × W"        },
      { label: "P2 Detect Head", value: "Stride-4, 160×160 for 16×16 cards" },
      { label: "Loss",          value: "Wise-IoU dynamic focusing"          },
    ],
    accent: "var(--accent)",
  },
  {
    name:      "Dharun Raj",
    initials:  "DR",
    photo:     "/team/dharun_raj.jpeg",
    role:      "Backend Systems & Pipeline Engineer",
    shortRole: "Backend Engineer",
    contributions: [
      "Built FastAPI backend with 17 REST endpoints — detection, video, camera, alerts, statistics, face registration",
      "Implemented no-ID violation rules (spatial checks on person vs card boxes)",
      "Integrated InsightFace (buffalo_l) for gallery match after violation capture; cosine threshold 0.4",
      "Staff escalation payloads — student identity, confidence, snapshot, timestamp for HOD / Principal",
      "Wrote MJPEG camera streaming with every-third-frame inference for live performance",
      "Designed alert deduplication with 30-second cooldown windows per identified person",
      "Wrote prepare_dataset.py for 80/10/10 splits with full label validation",
      "Built model export pipeline to ONNX / TensorRT for production deployment",
    ],
    highlights: [
      { label: "REST Endpoints",  value: "17 routes (FastAPI)"            },
      { label: "Stream Engine",   value: "MJPEG @ 1/3-frame inference"   },
      { label: "InsightFace",     value: "ArcFace gallery ≥ 0.4"         },
      { label: "Alert Cooldown",  value: "30 s / identified person"      },
    ],
    accent: "var(--accent-3)",
  },
  {
    name:      "Deepika",
    initials:  "DE",
    photo:     "/team/deepika.jpeg",
    role:      "Data Engineering & Research",
    shortRole: "Data & Research",
    contributions: [
      "Curated campus-style footage — visible ID vs no-ID cases, lighting, angle, and occlusion",
      "Cleaned and annotated images in YOLO format (class, cx, cy, w, h — normalized)",
      "Designed augmentation strategy — Mosaic, MixUp, Copy-Paste for small-object density",
      "Validated every label file: class IDs, value ranges, line format consistency",
      "Tested edge cases — partial visibility, back-facing subjects, multi-person, low-light",
      "Researched and documented CBAM (ECCV 2018), Coord-Attn (CVPR 2021), Wise-IoU (2023), ArcFace (CVPR 2019)",
      "Co-authored the project report and the public-facing technical documentation",
    ],
    highlights: [
      { label: "Format",          value: "YOLO normalized [0,1]"          },
      { label: "Classes",          value: "0 = card · 1 = person"         },
      { label: "Augmentation",    value: "Mosaic + MixUp + Copy-Paste"   },
      { label: "Papers",          value: "CBAM · Coord-Attn · ArcFace · Wise-IoU" },
    ],
    accent: "var(--accent-2)",
  },
];

/* ─── FAQ ───────────────────────────────────────────────── */
export const faqs = [
  {
    q: "Why CA-YOLO over standard YOLOv8?",
    a: "Because ID cards are small and easy to miss in CCTV. CBAM, Coordinate Attention, and our P2 stride-4 head improve person+card detection so no-ID alerts are reliable before identity lookup starts.",
  },
  {
    q: "Do you read text off the ID card?",
    a: "No. The system only checks card visibility as an object and then identifies the student from face embeddings against the enrolled gallery.",
  },
  {
    q: "What gets sent to the HOD or Principal?",
    a: "A single incident packet: timestamp, violation snapshot, detection confidence, InsightFace match score, matched student record, and dedup metadata to prevent repeated alerts.",
  },
];

/* ─── Benchmarks + references ───────────────────────────── */
export interface DetectionBenchmarkRow {
  model: string;
  init: string;
  epochs: string;
  setup: string;
  params: string;
  valMap50: string;
  valMap5095?: string;
  latency: string;
  smallObjectReadiness: number | null;
  deploymentFit: number | null;
  notes: string;
  status?: "final" | "experiment";
  highlight?: boolean;
}

export const detectionBenchmarks: DetectionBenchmarkRow[] = [
  {
    model: "YOLOv8n",
    init: "Pretrained",
    epochs: "100",
    setup: "3-head baseline",
    params: "3.2M",
    valMap50: "95.1%",
    valMap5095: "78.8%",
    latency: "7.4 ms",
    smallObjectReadiness: 72,
    deploymentFit: 92,
    notes: "Fast and compact, but misses more tiny card instances in crowded frames.",
    status: "final",
  },
  {
    model: "YOLOv8s",
    init: "Pretrained",
    epochs: "100",
    setup: "3-head baseline",
    params: "11.2M",
    valMap50: "96.8%",
    valMap5095: "82.6%",
    latency: "9.6 ms",
    smallObjectReadiness: 80,
    deploymentFit: 88,
    notes: "Balanced baseline with better recall than nano on campus footage.",
    status: "final",
  },
  {
    model: "YOLOv8m (base)",
    init: "Pretrained",
    epochs: "100",
    setup: "3-head baseline",
    params: "25.8M",
    valMap50: "97.3%",
    valMap5095: "84.1%",
    latency: "10.8 ms",
    smallObjectReadiness: 86,
    deploymentFit: 84,
    notes: "Strong baseline before custom modules.",
    status: "final",
  },
  {
    model: "CA-YOLOv8m (ours)",
    init: "Pretrained",
    epochs: "100",
    setup: "4-head + custom modules",
    params: "25.8M + modules",
    valMap50: "98.6%",
    valMap5095: "85.0%",
    latency: "11.2 ms",
    smallObjectReadiness: 95,
    deploymentFit: 90,
    notes: "CBAM + Coordinate Attention + P2 head + Wise-IoU improve tiny-card reliability.",
    status: "final",
    highlight: true,
  },
];

export interface FaceBenchmarkRow {
  model: string;
  backbone: string;
  identificationFit: number;
  speedFit: number;
  edgeReadiness: number;
  notes: string;
  highlight?: boolean;
}

export const faceBenchmarks: FaceBenchmarkRow[] = [
  {
    model: "OpenCV Haar + LBPH",
    backbone: "Classic CV",
    identificationFit: 58,
    speedFit: 90,
    edgeReadiness: 84,
    notes: "Very lightweight, but accuracy drops quickly in unconstrained campus views.",
  },
  {
    model: "FaceNet",
    backbone: "Inception-based",
    identificationFit: 82,
    speedFit: 74,
    edgeReadiness: 72,
    notes: "Strong embedding baseline; good for controlled galleries.",
  },
  {
    model: "ArcFace (generic)",
    backbone: "ResNet-based",
    identificationFit: 88,
    speedFit: 76,
    edgeReadiness: 78,
    notes: "High-quality embeddings with stable verification performance.",
  },
  {
    model: "InsightFace buffalo_l (ours)",
    backbone: "ArcFace family",
    identificationFit: 93,
    speedFit: 82,
    edgeReadiness: 86,
    notes: "Best fit for this pipeline: robust matching and practical deployment speed.",
    highlight: true,
  },
];

export interface ResearchReference {
  title: string;
  venue: string;
  year: string;
  url: string;
  usedFor: string;
}

export const researchReferences: ResearchReference[] = [
  {
    title: "YOLOv8 Documentation and Architecture",
    venue: "Ultralytics",
    year: "2023",
    url: "https://docs.ultralytics.com/models/yolov8/",
    usedFor: "Base detector architecture and training stack.",
  },
  {
    title: "CBAM: Convolutional Block Attention Module",
    venue: "ECCV",
    year: "2018",
    url: "https://arxiv.org/abs/1807.06521",
    usedFor: "Channel + spatial attention enhancement in the backbone.",
  },
  {
    title: "Coordinate Attention for Efficient Mobile Network Design",
    venue: "CVPR",
    year: "2021",
    url: "https://arxiv.org/abs/2103.02907",
    usedFor: "Directional attention to preserve positional cues for small objects.",
  },
  {
    title: "Wise-IoU: Bounding Box Regression Loss With Dynamic Focusing Mechanism",
    venue: "arXiv",
    year: "2023",
    url: "https://arxiv.org/abs/2301.10051",
    usedFor: "Improved box regression stability on harder training samples.",
  },
  {
    title: "ArcFace: Additive Angular Margin Loss for Deep Face Recognition",
    venue: "CVPR",
    year: "2019",
    url: "https://arxiv.org/abs/1801.07698",
    usedFor: "Face embedding objective used by modern identity pipelines.",
  },
  {
    title: "InsightFace",
    venue: "GitHub",
    year: "Active",
    url: "https://github.com/deepinsight/insightface",
    usedFor: "Production-ready face analysis toolkit used in this project.",
  },
];
