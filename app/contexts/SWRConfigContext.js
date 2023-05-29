"use client";

import { SWRConfig } from "swr";

export default function SWRConfigContext({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
