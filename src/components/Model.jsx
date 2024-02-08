import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
const Model = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute top-0 grid place-items-center h-screen w-screen backdrop-blur ">
          <div className="relative z-50 min-w-[360px] min-h-[200px] bg-white m-auto p-4 ">
            <div className="flex justify-end ">
              <MdClose className="text-2xl cursor-pointer" onClick={onClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("model-root")
  );
};
export default Model;
