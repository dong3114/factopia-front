import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";

export default function DefaultLayout({ children }) {
  return (
    <div className="w-30 bg-bottom">
      <LayoutHeader />
      <div className="w-full flex justify-center">
         <div className="w-full">{children}</div>
      </div>
      <LayoutFooter />
    </div>
  );
}