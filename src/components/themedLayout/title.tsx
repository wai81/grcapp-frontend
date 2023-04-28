import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";

const { useToken } = theme;

const defaultText = "GRC@pp";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
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
        {collapsed ? (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}

            >
                <img
                    src="/grcapp-collapsed_2.svg"
                    alt="GRC@pp"
                    style={{
                        margin: "0 auto",
                        padding: "12px 0",
                        maxHeight: "65.5px",
                    }}
                />
            </div>
        ) : (
            <img
                src="/grcapp_3.svg"
                alt="GRC@pp"
                style={{
                    width: "200px",
                    padding: "12px 24px",
                }}
            />
        )}
    </ActiveLink>
  );
};
