import { Modal as MantineModal } from "@mantine/core";
import { ReactElement } from "react";

const Modal = ({
  opened,
  close,
  children,
  title,
}: {
  opened: boolean;
  close: () => void;
  title?: string;
  children: ReactElement;
}) => {
  return (
    <MantineModal opened={opened} onClose={close}>
      {children}
    </MantineModal>
  );
};

export default Modal;
