import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { hasLength, useForm } from "@mantine/form";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginModel } from "../../../model/LoginModel";
import Repository from "../../helper/HttpHelper";
import { isNullOrEmpty } from "../../extension/StringExtension";
import { AuthProvider } from "../../helper/IAuthProvider";
import { NotificationExtension } from "../../extension/NotificationExtension";

export function AuthenticationTitle() {
  //#region  state
  const form = useForm<LoginModel>({
    initialValues: {
      username: "admin@gmail.com",
      password: "123456",
      remember: true,
    },

    validate: {
      username: hasLength(
        { min: 2, max: 100 },
        "Tài khoản phải chưa từ 2-10 kí tự !"
      ),
      password: hasLength(
        { min: 2, max: 100 },
        "Mật khẩu phải chưa từ 2-10 kí tự !"
      ),
    },
  });
  const navigate = useNavigate();

  const [visible, { toggle }] = useDisclosure(false);
  const [visible1, setvisible1] = useState(false);
  const repository = new Repository("http://localhost:50001/api/v1");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const callbackParam = queryParams.get("callback");
  const [value, setValue] = useLocalStorage({ key: "token", defaultValue: "" });

  //#endregion

  //#region use
  //#region  auth
  const isAuthenticated = AuthProvider.isAuthenticated();

  //#endregion

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
      if (isAuthenticated === true) {
        navigate(callbackParam ?? "/");
      }
    };
  }, []);

  //#endregion

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setvisible1(true);
    const data = form.values;
    // const resLogin = await IAuthProvider.signin(data);
    const resLogin = await AuthProvider.signin(data);
    setvisible1(false);
    if (resLogin !== undefined && !isNullOrEmpty(resLogin.data.jwt)) {
      setValue(resLogin.data.jwt);
      navigate(callbackParam ?? "/");
    }
  };

  const fakeLogin = async (e: FormEvent) => {
    e.preventDefault();
    setvisible1(true);
    localStorage.setItem("token", "fake token");
    AuthProvider.username = "da";
    NotificationExtension.Success("Đăng nhập thành công !");
    setvisible1(false);
    navigate(callbackParam ?? "/");
  };

  return (
    <Box component="form" maw={400} mx="auto" onSubmit={fakeLogin}>
      <LoadingOverlay
        visible={visible1}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Title ta="center" className={classes.title}>
        Xin chào!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Bạn không có tài khoản?{" "}
        <Anchor size="sm" component="button">
          Tạo mới tài khoản
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email: "
          placeholder="Email..."
          mt="md"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Quên mật khẩu ?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl">
          Đăng nhập
        </Button>
      </Paper>
    </Box>
  );
}
