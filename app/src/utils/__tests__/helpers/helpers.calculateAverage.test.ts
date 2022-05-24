import { calculateAverage } from "../../../utils";

test("calculateAverage | Get average with array of numbers", () => {
  const data = [10, 20, 30, 40, 50, 60, 70];
  expect(calculateAverage(data)).toBe(40);
});

test("calculateAverage | Get average with array of object using pat", () => {
  const data = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
  ];
  expect(calculateAverage(data, "value")).toBe(3);
});
