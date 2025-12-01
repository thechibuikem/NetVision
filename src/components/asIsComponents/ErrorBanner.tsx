import { useContext } from "react";
import { AppContext } from "../../api/context";
import { X } from "lucide-react";

// interface ErrorBannerProps {
//   message: string;
//   onClose: () => void;
// }

export default function ErrorBanner() {
  // setting up context
  const context = useContext(AppContext);
  if (!context) {
    console.log("use of context isn't permitted at Banner");
  } // guard to check if context's okay

  const { setAuthErrorMsg, authErrorMsg } = context; //destructuring from comntext

  return (
    <div className="fixed top-10 z-50 flex items-center justify-between p-4 md:px-8 mt-4 mb-8 md:my-8 w-full transparent-red-cards">
      <span className="text-sm font-medium">{authErrorMsg}</span>
      <button
        onClick={() => {
          setAuthErrorMsg("");
        }}
        className="ml-4 p-1 rounded transition-colors cursor-pointer"
        aria-label="Close error"
      >
        <X size={18} />
      </button>
    </div>
  );
}
