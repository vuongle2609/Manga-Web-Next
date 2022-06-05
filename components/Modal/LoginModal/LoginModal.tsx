import { FC, useEffect, useState } from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from "@nextui-org/react";
import useStore from "store/store";
import useLocalStorage from "store/persist";
import { validateEmail } from "data/handleData";
import { getUser, loginUser } from "data/getData";
import toast from "react-hot-toast";

const LoginModal: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [passwordWarning, setPasswordWarning] = useState<string>("");

  const [loginModal, setLoginModal, setUserData] = useStore((state: any) => [
    state.loginModal,
    state.setLoginModal,
    state.setUserData,
  ]);

  const [addToken] = useLocalStorage((state: any) => [state.addToken]);

  const closeHandler = () => {
    setLoginModal(false);
  };

  const loginHandler = async () => {
    if (password.length >= 8 && user.length !== 0) {
      try {
        const fromData = {
          password,
        };

        if (validateEmail(user)) {
          fromData["email"] = user.toLowerCase();
        } else {
          fromData["username"] = user.toLowerCase();
        }

        const res = await loginUser(fromData);

        const { refresh, session } = res.data.token;

        addToken({ refresh, session });

        const resUser = await getUser(session);

        setUserData(resUser.data.data);

        console.log(resUser.data.data);

        setLoginModal(false);
        toast.success(`Login as ${resUser.data.data.attributes.username}`);
      } catch (err) {
        toast.error(err.response.data.errors[0].detail);
      }
    } else {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
      }

      if (password.length === 0) {
        toast.error("Password field is required");
      }

      if (user.length === 0) {
        toast.error("Username field is required");
      }
    }
  };

  useEffect(() => {
    setPassword("");
    setUser("");
    setPasswordWarning("");
  }, [loginModal]);

  return (
    <Modal
      closeButton
      // blur
      aria-labelledby="modal-title"
      open={loginModal}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Login to&nbsp;
          <Text b size={18}>
            Paff Manga
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email or usename"
            onChange={(e: any) => setUser(e.target.value)}
            value={user}
            css={{ mb: "$8" }}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color={passwordWarning.length !== 0 ? "error" : "primary"}
            size="lg"
            placeholder={
              passwordWarning.length !== 0 ? passwordWarning : "Password"
            }
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
        </form>
        <Row justify="flex-end">
          <Text size={14}>Create an account</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
        <Button auto onClick={loginHandler}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
