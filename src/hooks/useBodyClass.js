import { useEffect } from 'react';

/** on=true boʻlsa <body> ga klasslar qoʻshadi, aks holda olib tashlaydi. */
export default function useBodyClass(on, ...classes) {
  useEffect(() => {
    if (!on) return;
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, classes.join(' ')]);
}
