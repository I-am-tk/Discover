import Header from "components/Header";
import { ReactElement } from "react";

const BasicLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow pb-16 sm:pb-8 bg-slate-50/50">
        <div className="max-w-screen-lg mx-auto bg-white">{children}</div>
      </main>
    </div>
  );
};
export default BasicLayout;
