import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to automatically scroll to the top of the page when the pathname changes.
 * Can be used in MainLayout or individual pages.
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find the scrollable container. 
    // In this app, it's likely the div with overflow-auto in MainLayout.
    // However, window.scrollTo(0, 0) is a safe default for most layouts.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you want a smooth transition
    });

    // If there's a specific scrollable container (like in our MainLayout), 
    // we might need to target it.
    const scrollContainer = document.querySelector(".overflow-auto");
    if (scrollContainer) {
      scrollContainer.scrollTo(0, 0);
    }
  }, [pathname]);
};

/**
 * Optional: ScrollToTop component if you prefer using it as a component
 */
export const ScrollToTop = () => {
  useScrollToTop();
  return null;
};
