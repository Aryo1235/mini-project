// DeleteConfirmationModal.js
import { Modal, Button } from "flowbite-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Konfirmasi Penghapusan</Modal.Header>
      <Modal.Body>
        <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} color="red">
          Hapus
        </Button>
        <Button onClick={onClose}>Batal</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
