import React from "react";
import ReactModal from "react-modal";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "90%",
    height: 220,
    margin: "0 auto",
    left: "50%",
    top: "50%",
    borderRadius: 15,
    padding: 0,
    transform: "translate(-50%, -50%)",
    color: "black",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(17, 17, 17, 0.45)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

type CustomModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function CustomModal(params: CustomModalProps) {
  let subtitle: any;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  return (
    <div>
      <Modal
        isOpen={params.isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={params.closeModal} // Now using the closeModal from props
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {params.children}
        {/* <button onClick={params.closeModal}>Close</button>{" "} */}
        {/* Use the external closeModal */}
      </Modal>
    </div>
  );
}
