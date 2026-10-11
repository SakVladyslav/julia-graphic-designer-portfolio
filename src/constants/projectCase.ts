/**
 * Shared case-study model. Every project page is a list of these sections.
 * Spacing is part of the model so a project can opt into a tighter gap
 * without a one-off stylesheet:
 * - section: 144px, the default rhythm between blocks
 * - block: 64px, a block that belongs to the previous heading (also hero → intro)
 * - stack: 16px, images stacked inside one gallery
 * - none: 0px, two frames that sit flush
 */
export type CaseSpace = "section" | "block" | "stack" | "none";

export interface CaseSectionBase {
  spaceBefore?: CaseSpace;
}

export interface CaseImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseIntroSection extends CaseSectionBase {
  type: "intro";
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
  tags: readonly string[];
}

export interface CaseMediaSection extends CaseSectionBase {
  type: "media";
  image: CaseImage;
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
  layout: "board" | "grid";
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
  | CasePosterSection;

export interface ProjectCase {
  id: string;
  title: string;
  sections: readonly CaseSection[];
}
