"use client";

import { Modal, Button } from "@wanin/ui";
import { useState } from "react";

export default function Test() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button text={"Show Modal"} onClick={() => setShowModal(true)} />
      <Modal
        activityModal={() => setShowModal(!showModal)}
        isOpen={showModal}
        className="bg-green">
        <div className="bg-green">
          <p className="w-title">Test</p>
        </div>
      </Modal>
    </div>
  );
}
