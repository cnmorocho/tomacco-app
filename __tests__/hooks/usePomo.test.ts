// import {act, renderHook} from "@testing"

import usePomo from "@/hooks/usePomo";
import { renderHook, act } from "@testing-library/react";

const MOCK_POMODORO_DEFAULT_STATE = {
  currentTime: 1500,
  isRunning: false,
  currentInteval: 0,
  goalInterval: 4,
};

describe("usePomo", () => {
  it("should return a instance of Pomodoro with default state", () => {
    const { result } = renderHook(usePomo);

    expect(result.current.countdown).not.toBeNull();
    expect(result.current.countdown).toEqual(MOCK_POMODORO_DEFAULT_STATE);
  });

  it("should return a function called 'play' that change the value of isRunning to true", () => {
    const { result } = renderHook(usePomo);

    act(() => {
      result.current.play();
    });

    expect(result.current.countdown.isRunning).toBeTruthy();
  });

  it("should return a function called 'pause' that change the value of isRunning to false", () => {
    const { result } = renderHook(usePomo);

    act(() => {
      result.current.pause();
    });

    expect(result.current.countdown.isRunning).toBeFalsy();
  });

  it("should return a function called 'stop' that change the value of isRunning to false and currentTime to 1500", () => {
    {
      const { result } = renderHook(usePomo);

      act(() => {
        result.current.stop();
      });

      expect(result.current.countdown.isRunning).toBeFalsy();
      expect(result.current.countdown.currentTime).toBe(1500);
    }
  });
});
