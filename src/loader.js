import React from "react";

const Loader = (props) => {
  if (props.showLoader) {
    return <div className="loader" />;
  }
  return null;
}

export default Loader;
