import { type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 md:px-8 md:py-6">
      {children}
    </main>
  );
};
