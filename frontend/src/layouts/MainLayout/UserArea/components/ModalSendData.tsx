import { Button, Modal } from "antd";
import { useState } from "react";

export default function ModalSendData({
  handleSendData,
  isModalSendData,
  handleCancelSendDataModal,
}: {
  handleSendData: any;
  isModalSendData: any;
  handleCancelSendDataModal: any;
}) {
  return (
    <Modal
      open={isModalSendData}
      onOk={handleSendData}
      onCancel={handleCancelSendDataModal}
      footer={null}
      centered
    >
      Would you like to update this information?
      <Button type="primary" onClick={handleSendData}>
        Yes
      </Button>
      <Button>No</Button>
    </Modal>
  );
}
