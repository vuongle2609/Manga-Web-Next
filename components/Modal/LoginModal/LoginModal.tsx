import { FC, useEffect, useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import useStore from "store/store";
import useLocalStorage from "store/persist";
import { validateEmail } from "data/handleData";
import { getUser, loginUser } from "data/getData";

const LoginModal: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [passwordWarning, setPasswordWarning] = useState<string>("");
  const [userWarning, setUserWarning] = useState<string>("");

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
    if (password.length !== 0 && user.length !== 0) {
      const fromData = {
        password,
      };

      if (validateEmail(user)) {
        fromData["email"] = user;
      } else {
        fromData["username"] = user;
      }

      const res = await loginUser(fromData);

      const { refresh, session } = res.data.token;

      addToken({ refresh, session });

      const resUser = await getUser(session);

      setUserData(resUser.data.data);

      setLoginModal(false);
    } else {
      if (password.length === 0) {
        setPasswordWarning("This field is required");
      }

      if (user.length === 0) {
        setUserWarning("This field is required");
      }
    }
  };

  useEffect(() => {
    setPassword("");
    setUser("");
    setPasswordWarning("");
    setUserWarning("");
  }, [loginModal]);

  return (
    <Modal
      closeButton
      blur
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
        <Input
          clearable
          bordered
          fullWidth
          color={userWarning.length !== 0 ? "error" : "primary"}
          size="lg"
          placeholder={
            userWarning.length !== 0 ? userWarning : "Email or usename"
          }
          onChange={(e: any) => setUser(e.target.value)}
          value={user}
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
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
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
