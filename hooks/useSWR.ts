import { useEffect, useState } from "react";

export const useSSR = () => {
  const [SSR, setSSR] = useState(true);
  useEffect(() => setSSR(false), []);
  return SSR;
};
