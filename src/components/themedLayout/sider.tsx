import React, { CSSProperties } from "react";
import {
  useTranslate,
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useRouterContext,
  useMenu,
  useRefineContext,
  useLink,
  useRouterType,
  useActiveAuthProvider,
  pickNotDeprecated,
  useWarnAboutChange,
} from "@refinedev/core";
import { ThemedTitleV2, useSiderVisible } from "@refinedev/antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import type { RefineThemedLayoutV2SiderProps } from "@refinedev/antd";

const drawerButtonStyles: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  position: "fixed",
  top: 64,
  zIndex: 999,
};

const { SubMenu } = Menu;
const { useToken } = theme;

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
}) => {
  const { token } = useToken();
  const {
    siderVisible,
    setSiderVisible,
    drawerSiderVisible,
    setDrawerSiderVisible,
  } = useSiderVisible();

  const isExistAuthentication = useIsExistAuthentication();
  const routerType = useRouterType();
  const NewLink = useLink();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const TitleFromContext = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? ThemedTitleV2;

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const {
        icon,
        label,
        route,
        key,
        name,
        children,
        parentName,
        meta,
        options,
      } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu
              key={item.key}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
          undefined && children.length === 0
      );

      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={item.key}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route ?? ""}>{label}</Link>
            {!drawerSiderVisible && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Menu.Item
      key="logout"
      onClick={() => handleLogout()}
      icon={<LogoutOutlined />}
    >
      {translate("buttons.logout", "Logout")}
    </Menu.Item>
  );

  const dashboard = hasDashboard ? (
    <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
      <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
      {!drawerSiderVisible && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed: drawerSiderVisible,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <>
        <Menu
          theme="dark"
          selectedKeys={selectedKey ? [selectedKey] : []}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          style={{
            marginTop: "8px",
            border: "none",
          }}
          onClick={() => {
            setSiderVisible?.(false);
            if (!breakpoint.lg) {
              setDrawerSiderVisible?.(true);
            }
          }}
        >
          {renderSider()}
        </Menu>
      </>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={siderVisible}
          onClose={() => setSiderVisible?.(false)}
          placement="left"
          closable={false}
          width={200}
          bodyStyle={{
            padding: 0,
          }}
          maskClosable={true}
        >
          <Layout>
            {/*  */}
            <Layout.Sider
              style={{
                height: "100vh",
                overflow: "hidden",
                backgroundColor:"#001529",
                borderRight: `1px solid "#001529"`,
                //backgroundColor: token.colorBgContainer,
                //borderRight: `1px solid ${token.colorBgElevated}`,
              }}
            >
              <div
                style={{
                  width: "200px",
                  padding: "0 16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "64px",
                  backgroundColor: "#001529",
                  //backgroundColor: token.colorBgElevated,
                }}
              >
                <RenderToTitle collapsed={false} />
              </div>
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        <Button
          style={drawerButtonStyles}
          size="large"
          onClick={() => setSiderVisible?.(true)}
          icon={<BarsOutlined />}

        ></Button>
      </>
    );
  };

  if (isMobile) {
    return renderDrawerSider();
  }

  return (
    <Layout.Sider
      style={{
        backgroundColor: "#001529",
        borderRight: `1px solid "#001529"`,
        //backgroundColor: token.colorBgContainer,
        //borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      collapsible
      collapsed={drawerSiderVisible}
      onCollapse={(collapsed) => setDrawerSiderVisible?.(collapsed)}
      collapsedWidth={80}
      breakpoint="lg"
      trigger={
        <Button
          type="text"
          style={{
            borderRadius: 0,
            height: "100%",
            width: "100%",
            //backgroundColor: "#05345e",
            //backgroundColor: token.colorBgElevated,
          }}
        >
          {drawerSiderVisible ? (
            <RightOutlined
              style={{
                //color: token.colorPrimary,
                  color: token.colorWhite,
              }}
            />
          ) : (
            <LeftOutlined
              style={{
                //color: token.colorPrimary,
                color: token.colorWhite,
              }}
            />
          )}
        </Button>
      }
    >
      <div
        style={{
          width: drawerSiderVisible ? "80px" : "200px",
          padding: drawerSiderVisible ? "0" : "0 0px",
          display: "flex",
          justifyContent: drawerSiderVisible ? "center" : "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: "#001529",
          //backgroundColor: token.colorBgElevated,
          fontSize: "14px",

        }}
      >
        <RenderToTitle collapsed={drawerSiderVisible} />
      </div>
      {renderMenu()}
    </Layout.Sider>
  );
};
