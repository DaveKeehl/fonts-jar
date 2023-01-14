import ReactModal from "react-modal"

ReactModal.setAppElement("#root")

interface IModal {
  isModalOpen: boolean
  closeModal: () => void
  contentLabel: string
  children: React.ReactNode
}

export const Modal = ({
  children,
  isModalOpen,
  closeModal,
  contentLabel
}: IModal) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "auto",
          borderRadius: "16px",
          padding: "0"
        },
        overlay: {
          background: "hsla(226, 74%, 9%, 0.6)"
        }
      }}
      bodyOpenClassName="body-open"
      contentLabel={contentLabel}>
      {children}
    </ReactModal>
  )
}
