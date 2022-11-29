import { Modal, Button } from "@wanin/ui";
import { type FC } from "react";
import { signIn } from "next-auth/react";

interface Props {
  isOpen: boolean;
  activityModal: () => void;
}

const LoginModel: FC<Props> = ({ isOpen, activityModal }) => {
  return (
    <Modal isOpen={isOpen} activityModal={activityModal}>
      <div className="w-bg-primary flex flex-col justify-center items-center gap-5 rounded-lg min-w-[250px] h-[300px]">
        <Button text="Facebook" onClick={() => signIn("facebook")} />
        <Button text="Twitch" onClick={() => signIn("twitch")} />
      </div>
    </Modal>
  );
};

export default LoginModel;
