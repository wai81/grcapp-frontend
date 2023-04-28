import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
//import dataProvider from "@refinedev/simple-rest";
import { AppIcon } from "components/app-icon";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
// import { ForgotPassword } from "pages/forgotPassword";
// import { Login } from "pages/login";
// import { Register } from "pages/register";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/auth-provider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {ThemedHeaderV2} from "./components/themedLayout/header";
import {ThemedSiderV2} from "./components/themedLayout/sider";
import {ThemedTitleV2} from "./components/themedLayout/title";
import {ThemedLayoutV2} from "./components/themedLayout";
import {API_URL, TOKEN_KEY} from "./constants";
import axios, {AxiosRequestConfig} from "axios";
import {Register} from "./pages/register";
import {AuthPage} from "./pages/auth";
import {dataProvider} from "./providers/data-provider";
import {CalendarOutlined, CarFilled} from "@ant-design/icons";
import {BookingTransportList} from "./pages/booking_transports";
import {TransportList} from "./pages/transports";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  console.log(request)
  return request;
});


function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };


  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            //dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            dataProvider={dataProvider(API_URL, axiosInstance)}
            notificationProvider={notificationProvider}
            authProvider={authProvider(axiosInstance)}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "booking-transport",
                meta: {
                   icon: <CarFilled />,
                  },
                }, {
                name: "dashboard_transport",
                list: "/booking-transport/dashboard_transport",
                //show: "/booking-transport/booking_transport/show/:id",
                meta: {
                  //icon: <CalendarOutlined />,
                  parent: "booking-transport",
                },
              },
              {
                name: "booking_transport",
                list: "/booking-transport/booking_transport",
                show: "/booking-transport/booking_transport/show/:id",

                meta: {
                  //icon: <LibraryBooksTwoToneIcon/>,
                  parent: "booking-transport",
                },

              }, {
                name: "transports",
                list: "/booking-transport/transports",
                show: "/booking-transport/transports/show/:id",

                meta: {
                  //icon: <DriveEtaTwoToneIcon/>,
                  parent: "booking-transport",
                },

              },
              // {
              //   name: "blog_posts",
              //   list: "/blog-posts",
              //   create: "/blog-posts/create",
              //   edit: "/blog-posts/edit/:id",
              //   show: "/blog-posts/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
              // {
              //   name: "categories",
              //   list: "/categories",
              //   create: "/categories/create",
              //   edit: "/categories/edit/:id",
              //   show: "/categories/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={ThemedHeaderV2}
                      Sider={ThemedSiderV2}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="GRCApp"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                {/* маршрутизация на главную страницу(по умолчанию) поле аутенфикации */}
                <Route
                  index
                  element={<NavigateToResource resource="dashboard_transport"/>}
                />
                <Route path="booking-transport">
                  {/*<Route path="dashboard_transport">*/}
                  {/*  <Route index element={<DashboardBookingTransport/>}/>*/}
                  {/*</Route>*/}
                  <Route path="booking_transport">
                    <Route index element={<BookingTransportList/>}/>
                  </Route>
                  <Route path="transports">
                    <Route index element={<TransportList/>}/>
                  </Route>
                </Route>
                {/*<Route path="/blog-posts">*/}
                {/*  <Route index element={<BlogPostList />} />*/}
                {/*  <Route path="create" element={<BlogPostCreate />} />*/}
                {/*  <Route path="edit/:id" element={<BlogPostEdit />} />*/}
                {/*  <Route path="show/:id" element={<BlogPostShow />} />*/}
                {/*</Route>*/}
                {/*<Route path="/categories">*/}
                {/*  <Route index element={<CategoryList />} />*/}
                {/*  <Route path="create" element={<CategoryCreate />} />*/}
                {/*  <Route path="edit/:id" element={<CategoryEdit />} />*/}
                {/*  <Route path="show/:id" element={<CategoryShow />} />*/}
                {/*</Route>*/}
              </Route>
              {/* маршрутизация для страницы логина   */}
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<AuthPage type="login" />} />
                {/*<Route path="/register" element={<Register />} />*/}
                {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
              </Route>
              {/* маршрутизация для страницы 404  */}
              <Route
                element={
                  <Authenticated>
                    <ThemedLayoutV2
                      Header={ThemedHeaderV2}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="GRCApp"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
