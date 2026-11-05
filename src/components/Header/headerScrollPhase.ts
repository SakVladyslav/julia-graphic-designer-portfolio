export type HeaderLook = "resting" | "hidden" | "pinned";

export type HeaderMotion = "slide" | "none";

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

  if (distance < TRAVEL_THRESHOLD_PX || (direction === "up" && input.scrollY <= 0)) {
    return { look: input.look, travel, motion: "none" };
  }

  const look: HeaderLook = direction === "down" ? "hidden" : "pinned";

  return {
    look,
    travel,
    motion: look === input.look ? "none" : "slide",
  };
}
