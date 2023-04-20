// import {act, renderHook} from "@testing"

import usePomo from "@/hooks/usePomo";
import { renderHook } from "@testing-library/react";

const MOCK_TIMER_DEFAULT_STATE = {
  currentTime: 1500,
  isRunning: false,
};

describe("usePomo", () => {
  it("should return a Timer default state", () => {
    const { result } = renderHook(usePomo);

    const { timer } = result.current;

    expect(timer).not.toBeNull();
    expect(timer).toEqual(MOCK_TIMER_DEFAULT_STATE);
  });
});
