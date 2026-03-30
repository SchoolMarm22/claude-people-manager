"use client";

import { createContext, useContext, useState } from "react";

const BuilderNotesContext = createContext<{
  visible: boolean;
  toggle: () => void;
}>({ visible: true, toggle: () => {} });

export function BuilderNotesProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <BuilderNotesContext.Provider value={{ visible, toggle: () => setVisible((v) => !v) }}>
      {children}
    </BuilderNotesContext.Provider>
  );
}

export function useBuilderNotes() {
  return useContext(BuilderNotesContext);
}
