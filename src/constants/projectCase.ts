/**
 * Shared case-study model. Every project page is a list of these sections.
 * Spacing is part of the model so a project can opt into a tighter gap
 * without a one-off stylesheet:
 * - section: 144px, the default rhythm between blocks
 * - block: 64px, a block that belongs to the previous heading (also hero → intro)
 * - group: 184px, a larger break between gallery groups
 * - stack: 16px, images stacked inside one gallery
 * - none: 0px, two frames that sit flush
 */
export type CaseSpace = "section" | "block" | "group" | "stack" | "none";

export interface CaseSectionBase {
  spaceBefore?: CaseSpace;
}

export interface CaseImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseIntroLink {
  label: string;
  href: string;
}

export interface CaseIntroSection extends CaseSectionBase {
  type: "intro";
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
  tags: readonly string[];
  link?: CaseIntroLink;
}

export interface CaseMediaSection extends CaseSectionBase {
  type: "media";
  image: CaseImage;
  caption?: string;
  captionAlign?: "start" | "end";
  framed?: boolean;
}

export interface CaseClusterSection extends CaseSectionBase {
  type: "cluster";
  lead: CaseImage;
  stack: readonly [CaseImage, CaseImage];
}

export interface CaseStaggerFrame {
  image: CaseImage;
  caption: string;
  captionAlign: "start" | "end";
}

export interface CaseStaggerSection extends CaseSectionBase {
  type: "stagger";
  /** The first frame sits on the right. The second starts where that image ends. */
  frames: readonly [CaseStaggerFrame, CaseStaggerFrame];
  ornament?: CaseImage;
}

export interface CaseBannerSection extends CaseSectionBase {
  type: "banner";
  background: string;
  ink: string;
  title: string;
  emphasis: string;
  body: string;
  mark: CaseImage;
}

export interface CaseNoteSection extends CaseSectionBase {
  type: "note";
  ink: string;
  detail: string;
  title: string;
  emphasis: string;
  body: string;
  ornament: CaseImage;
}

export interface CaseLogoStackSection extends CaseSectionBase {
  type: "logoStack";
  background: string;
  mark: CaseImage;
  wordmark: CaseImage;
}

export interface CaseWordmarkLogo {
  mark: CaseImage;
  rule: CaseImage;
  top: CaseImage;
  middle: CaseImage;
  bottom: CaseImage;
}

export interface CaseLogoPairTile {
  background: string;
  logo: CaseWordmarkLogo;
}

export interface CaseLogoPairSection extends CaseSectionBase {
  type: "logoPair";
  tiles: readonly [CaseLogoPairTile, CaseLogoPairTile];
}

export interface CaseIconSlot {
  image: CaseImage;
  inset: string;
}

export interface CaseIconBoardSection extends CaseSectionBase {
  type: "iconBoard";
  background: string;
  icons: readonly CaseIconSlot[];
}

export interface CaseTypefacePanel {
  role: "logo" | "communication";
  label: string;
  weights: readonly string[];
  name: string;
}

export interface CaseTypefacesSection extends CaseSectionBase {
  type: "typefaces";
  background: string;
  ink: string;
  accent: string;
  panels: readonly [CaseTypefacePanel, CaseTypefacePanel];
}

export interface CaseComparisonSide {
  label: string;
  image: CaseImage;
}

export interface CaseComparisonSection extends CaseSectionBase {
  type: "comparison";
  before: CaseComparisonSide;
  after: CaseComparisonSide;
}

export interface CaseSplitSection extends CaseSectionBase {
  type: "split";
  heading: string;
  paragraphs: readonly string[];
}

export interface CaseColor {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  fill: string;
  /** Text color on the filled block. Absent when the specs sit on the page. */
  ink?: string;
  image?: CaseImage;
}

export interface CasePaletteSection extends CaseSectionBase {
  type: "palette";
  size: "tall" | "short";
  colors: readonly CaseColor[];
}

export interface CaseMarkTile {
  background: string;
  image: CaseImage;
}

export interface CaseMarksSection extends CaseSectionBase {
  type: "marks";
  layout: "board" | "grid" | "lockup";
  tiles: readonly CaseMarkTile[];
}

export interface CasePosterSection extends CaseSectionBase {
  type: "poster";
  headingId: string;
  background: string;
  panel: string;
  ink: string;
  detail: string;
  title: string;
  subtitle: string;
  mark: CaseImage;
}

export type CaseSection =
  | CaseIntroSection
  | CaseMediaSection
  | CaseComparisonSection
  | CaseSplitSection
  | CasePaletteSection
  | CaseMarksSection
  | CasePosterSection
  | CaseClusterSection
  | CaseStaggerSection
  | CaseBannerSection
  | CaseNoteSection
  | CaseLogoStackSection
  | CaseLogoPairSection
  | CaseIconBoardSection
  | CaseTypefacesSection;

export interface ProjectCase {
  id: string;
  title: string;
  sections: readonly CaseSection[];
}
