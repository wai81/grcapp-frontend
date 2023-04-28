import React, { useState } from "react";
import {
  LoginPageProps,
  LoginFormTypes,
  useRouterContext,
  useLink,
  useRouterType,
  useLogin,
  useTranslate,
  useActiveAuthProvider,
} from "@refinedev/core";

type DivPropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type FormPropsType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export interface ILoginForm {
  username?: string;
  password?: string;
  remember?: boolean;
  providerName?: string;
  redirectPath?: string;
}

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<ILoginForm>();

  const renderLink = (link: React.ReactNode, text?: string) => {
    if (link) {
      if (typeof link === "string") {
        return <ActiveLink to={link}>{text}</ActiveLink>;
      }
      return link;
    }
    return null;
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div
          key={provider.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() =>
              login({
                providerName: provider.name,
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <div {...contentProps}>
      <h1 style={{ textAlign: "center" }}>
        {translate("pages.login.title", "Sign in to your account")}
      </h1>
      {renderProviders()}
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ username, password, remember });
        }}
        {...formProps}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 25,
          }}
        >
          <label>{translate("pages.login.fields.username", "Username")}</label>
          <input
            name="username"
            type="text"
            size={20}
            autoCorrect="off"
            spellCheck={false}
            autoCapitalize="off"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>{translate("pages.login.fields.password", "Password")}</label>
          <input
            type="password"
            name="password"
            required
            size={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {rememberMe ?? (
            <>
              <label>
                {translate("pages.login.buttons.rememberMe", "Remember me")}
                <input
                  name="remember"
                  type="checkbox"
                  size={20}
                  checked={remember}
                  value={remember.toString()}
                  onChange={() => {
                    setRemember(!remember);
                  }}
                />
              </label>
            </>
          )}
          <br />
          {/*{forgotPasswordLink ??
            renderLink(
              "/forgot-password",
              translate(
                "pages.login.buttons.forgotPassword",
                "Forgot password?"
              )
            )}*/}
          <input
            type="submit"
            value={translate("pages.login.signin", "Sign in")}
          />
          {registerLink ?? (
            <span>
              {translate(
                "pages.login.buttons.noAccount",
                "Don’t have an account?"
              )}{" "}
              {renderLink(
                "/register",
                translate("pages.login.register", "Sign up")
              )}
            </span>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
