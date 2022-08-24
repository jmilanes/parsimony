import React, { useEffect, useState } from "react";
import { debounceTime, fromEvent } from "rxjs";
import { Header } from "../components";
import { useServices } from "../context";

const createShortCut = (key: string, handler: () => void) => {
  const event$ = fromEvent(document, "keydown").pipe(debounceTime(250));
  event$.subscribe((e) => e.code === key && handler());
};

const Login = ({ from }: { from: string }) => {
  const { authService } = useServices();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => authService.logIn(userName, password);
  createShortCut("Enter", login);

  useEffect(() => {
    authService.setPreviousPage(from);
  }, []);

  return (
    <>
      <Header text="Login" size="lg" />
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="user name"
        id=""
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        id=""
      />
      <button onClick={login}>Login</button>
    </>
  );
};
export default Login;
