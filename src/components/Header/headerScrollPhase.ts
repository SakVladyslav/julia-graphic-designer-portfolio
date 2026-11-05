export type HeaderLook = "resting" | "hidden" | "pinned";

export type HeaderMotion = "slide" | "none" | "fade" | "immediate";

export type HeaderScrollDirection = "down" | "up";

export interface HeaderScrollTravel {
  direction: HeaderScrollDirection;
  distance: number;
}

export interface HeaderScrollPhaseInput {
  look: HeaderLook;
  travel: HeaderScrollTravel;
  deltaY: number;
  scrollY: number;
  menuOpen?: boolean;
  focusInside?: boolean;
  focusEntered?: boolean;
  reducedMotion?: boolean;
  kind?: "scroll" | "jump";
}

export interface HeaderScrollPhaseResult {
  look: HeaderLook;
  travel: HeaderScrollTravel;
  motion: HeaderMotion;
}

const TRAVEL_THRESHOLD_PX = 10;

export function headerScrollPhase(input: HeaderScrollPhaseInput): HeaderScrollPhaseResult {
  const direction: HeaderScrollDirection =
    input.deltaY > 0 ? "down" : input.deltaY < 0 ? "up" : input.travel.direction;
  const directionChanged = input.deltaY !== 0 && input.travel.direction !== direction;
  const distance =
    input.deltaY === 0
      ? input.travel.distance
      : directionChanged
        ? Math.abs(input.deltaY)
        : input.travel.distance + Math.abs(input.deltaY);
  const travel: HeaderScrollTravel = { direction, distance };

  if (input.scrollY <= 0) {
    return { look: "resting", travel, motion: "none" };
  }

  if (input.focusEntered === true && input.look === "hidden") {
    return {
      look: "pinned",
      travel,
      motion: input.reducedMotion === true ? "fade" : "immediate",
    };
  }

  if (input.kind !== "jump" && (input.menuOpen === true || input.focusInside === true)) {
    return { look: input.look, travel: input.travel, motion: "none" };
  }

  if (input.deltaY === 0) {
    return { look: input.look, travel, motion: "none" };
  }

  if (distance < TRAVEL_THRESHOLD_PX) {
    return { look: input.look, travel, motion: "none" };
  }

  const look: HeaderLook = direction === "down" ? "hidden" : "pinned";

  return {
    look,
    travel,
    motion: look === input.look ? "none" : "slide",
  };
}
