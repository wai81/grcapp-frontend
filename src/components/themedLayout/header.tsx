import React, {useContext} from "react";
import {useActiveAuthProvider, useApiUrl, useGetIdentity, useGetLocale, useSetLocale} from "@refinedev/core";
import {Layout as AntdLayout, Typography, Avatar, Space, theme, MenuProps, Dropdown, Button, Switch} from "antd";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {ColorModeContext} from "../../contexts/color-mode";
import {useTranslation} from "react-i18next";
import {DownOutlined} from "@ant-design/icons";
import {IUser} from "../../interfaces/IUser";

const { Text } = Typography;
const { useToken } = theme;



export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const apiUrl = useApiUrl();
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const authProvider = useActiveAuthProvider();
  const currentLocale = locale();

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
      .sort()
        .map((lang: string) => ({
            key: lang,
            onClick: () => changeLanguage(lang),
            icon: (
                <span style={{ marginRight: 8 }}>
                    <Avatar size={16} src={`/images/flags/${lang}.svg`} />
                </span>
            ),
            label: lang === "en"
                ? "English"
                : lang === "de"
                    ? "German"
                    : "Русский"
            ,
      }));
  const randomColor= () =>{
      const hex = Math.floor(Math.random() * 0xFFFFFF);
      const color = "#" + hex.toString(16);
      return color
    }
  // const shouldRenderHeader = user && (user.username || user.avatar);
  //
  // if (!shouldRenderHeader) {
  //   return null;
  // }

  return (
    <AntdLayout.Header
        style={{
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
        <Space>
            <Dropdown
                menu={{
                    items: menuItems,
                    selectedKeys: currentLocale ? [currentLocale] : [],
                }}
            >
                <Button type="text">
                    <Space>
                        <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
                        {currentLocale === "en"
                            ? "English"
                            : currentLocale === "de"
                                ? "German"
                                : "Русский"}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <Switch
                checkedChildren="🌛"
                unCheckedChildren="🔆"
                onChange={() => setMode(mode === "light" ? "dark" : "light")}
                defaultChecked={mode === "dark"}
            />
            <Space style={{ marginLeft: "8px" }} size="middle">
                {user?.username && <Text strong>{user?.last_name} {user?.first_name}</Text>}

                {user?.avatar == null ?
                    <Avatar style={{ backgroundColor: randomColor()}}>
                        {user?.last_name.charAt(0)}{user?.first_name.charAt(0)}
                    </Avatar>
                    : <Avatar src={`${apiUrl}/${user?.avatar}`} alt={user?.last_name} />
                }
            </Space>
        </Space>
    </AntdLayout.Header>
  );
};
