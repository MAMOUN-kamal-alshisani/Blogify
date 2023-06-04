import React from "react";
import "./scss/deleteModal.css";
import { GrClose } from "react-icons/gr";

import { CgSpinnerAlt } from "react-icons/cg";

export default function DeleteModal({
  blogId,
  setShowPopUpDelete,
  showPopUpDelete,
  blog,
  deleteBlog,
}) {


  return (
    showPopUpDelete &&
    blogId === blog.id && (
      <div className="deleteModal">
        <div className="deleteModalCn">

          <div className="HeaderCn">
            <h1>Delete Confirmation</h1>
            <button
              className="deleteModalBtn CancelBtn"
              onClick={() => setShowPopUpDelete(!showPopUpDelete)}
            >
              <GrClose />
            </button>
          </div>

          <div className="middlePartCn">
            <p>are you sure you want to delete this blog?</p>
          </div>

          <div className="footerCn">
          <button
              className="deleteModalBtn CancelBtn"
              onClick={() => setShowPopUpDelete(!showPopUpDelete)}
            >
              Cancel
            </button>
            <button
              className="deleteModalBtn deleteBtn"
              onClick={() => deleteBlog.mutate(blog.id)}
            >
              Delete  {deleteBlog.isLoading && <CgSpinnerAlt className="BtnSpinner"/> } 
            </button>
       
          </div>

        </div>
      </div>
    )
  );
}
