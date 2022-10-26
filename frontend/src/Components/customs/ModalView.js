import React from "react";

const ModalView = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full flex items-center bg-[rgba(0,0,0,.5)]">
      <div className=" text-center bg-white p-8 mx-auto rounded-lg max-w-[600px] w-11/12">
        {children}
      </div>
    </div>
  );
};

export default ModalView;
