"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ApplyModalContextType {
  isOpen: boolean;
  courseName: string;
  openApplyModal: (course?: string) => void;
  closeApplyModal: () => void;
}

const ApplyModalContext = createContext<ApplyModalContextType | undefined>(undefined);

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("New Age Digital Marketing");

  function openApplyModal(course?: string) {
    if (course) {
      setCourseName(course);
    }
    setIsOpen(true);
  }

  function closeApplyModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleCustomEvent(e: Event) {
      const customEvent = e as CustomEvent<{ course?: string }>;
      openApplyModal(customEvent.detail?.course);
    }

    window.addEventListener("open-apply-modal", handleCustomEvent);
    return () => {
      window.removeEventListener("open-apply-modal", handleCustomEvent);
    };
  }, []);

  return (
    <ApplyModalContext.Provider
      value={{
        isOpen,
        courseName,
        openApplyModal,
        closeApplyModal,
      }}
    >
      {children}
    </ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  const context = useContext(ApplyModalContext);
  if (!context) {
    throw new Error("useApplyModal must be used within an ApplyModalProvider");
  }
  return context;
}

export function triggerApplyModal(course?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-apply-modal", { detail: { course } })
    );
  }
}
