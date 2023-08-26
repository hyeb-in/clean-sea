import { useCallback, useState } from "react";

/**
 * 토글 상태 구현
 */
export const useToggle = (initialValue = false) => {
  const [show, setShow] = useState(initialValue);
  const toggle = useCallback(() => {
    setShow(prevState => !prevState);
  }, []);

  return [show, toggle, setShow];
};
