"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface SpamFieldsRef {
  getValues: () => { _website: string; _loaded: number };
}

const SpamFields = forwardRef<SpamFieldsRef>(function SpamFields(_, ref) {
  const websiteRef = useRef<HTMLInputElement>(null);
  const [loaded] = useState(() => Date.now());

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      _website: websiteRef.current?.value || "",
      _loaded: loaded,
    }),
  }));

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}
    >
      <label htmlFor="_website">Website</label>
      <input
        ref={websiteRef}
        type="text"
        id="_website"
        name="_website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
});

export default SpamFields;
