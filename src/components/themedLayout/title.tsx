import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";

const { useToken } = theme;

const defaultText = "GRC@pp";
export type CutomRefineLayoutThemedTitleProps = RefineLayoutThemedTitleProps & {
  isLoginPage?: boolean;
};

const defaultIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="refine-logo"
  >
    <path
      d="m23 26.59-3.29-3.29-1.41 1.41 4 4a1 1 0 0 0 1.41 0l8-8-1.41-1.41z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29 0H3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h14v-2H3a1 1 0 0 1-1-1v-9h6v4a1 1 0 0 0 1 1h6v-2h-5v-3h5a1 1 0 0 0 1-1v-6h-2v5H2V3a1 1 0 0 1 1-1h11v6H7v2h8a1 1 0 0 0 1-1V2h13a1 1 0 0 1 1 1v9h-6V5h-2v8a1 1 0 0 0 1 1h7v2h2V3a3 3 0 0 0-3-3z"
      fill="currentColor"
    />
  </svg>
);

export const ThemedTitleV2: React.FC<CutomRefineLayoutThemedTitleProps> = ({
  collapsed,
  isLoginPage = false,
  icon = defaultIcon,
  text = defaultText,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
    
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "32px",
            width: "32px",
            color: isLoginPage ? 'whitesmoke': token.colorPrimary,
          }}
        >
          {icon}
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "150%",
              marginBottom: 0,
              marginLeft:10,
              fontWeight: 700,
              color: isLoginPage ? 'whitesmoke':'',
            }}
          >
            {text}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};
