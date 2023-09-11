import { useState, ChangeEvent } from "react";

/**
 * 实现双向绑定
 * @param initialValue
 * @returns
 */
const useTwoWayBinding = (
  initialValue: string
): [string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(initialValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};

export default useTwoWayBinding;
