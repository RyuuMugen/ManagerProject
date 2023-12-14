import { createBrowserRouter } from "react-router-dom";
import _404 from "../../_base/component/_layout/_404";
import { Layout } from "../../_base/component/_layout/_layout";
import { LayoutAuth } from "../../_base/component/_layout/_layoutAuth";
import { AuthenticationTitle } from "../../_base/component/_login/_login";
import { SelectListItem } from "../../model/SelectListItem";
import Home from "../../views/home/homeView";
import ProductList from "../../views/ProductManager/ProductList/MainView";
import DemoView from "../../views/demo/demoView";
import ListMenu from "../../views/MegaMenu/ListMenu/MainView";
import HomeView from "../../views/Category/homeView";
import CreateView from "../../views/Category/createView";

const router = createBrowserRouter([
  {
    // path: "/",
    id: "root",
    element: <Layout />,
    errorElement: <_404 />,
    action: async ({ request }) => {
      // if (auth)
      //  return protectedLoader;
    },
    children: [
      {
        path: "/",
        element: <Home />,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: false,
              Group: null,
              Selected: false,
              Text: "",
              Value: "",
            };
            model.Text = "Trang chủ";
            model.Value = "/";
            return model;
          },
        },
      },
      {
        path: "/category",
        element: <HomeView></HomeView>,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: true,
              Group: null,
              Selected: false,
              Text: "",
              Value: "",
            };
            model.Text = "Danh mục sản phẩm";
            model.Value = "/category";
            return model;
          },
        },
        // children: [
        //   {
        //     path: "/category/create",
        //     element: <CreateView />,
        //     handle: {
        //       crumb: () => {
        //         let model: SelectListItem = {
        //           Disabled: false,
        //           Group: null,
        //           Selected: false,
        //           Text: "",
        //           Value: "",
        //         };
        //         model.Text = "Trang chủ";
        //         model.Value = "/";
        //         return model;
        //       },
        //     },
        //   },
        // ]
      },
      {
        path: "/demo",
        element: <DemoView></DemoView>,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: true,
              Group: null,
              Selected: false,
              Text: "",
              Value: "",
            };
            model.Text = "Demo";
            model.Value = "/demo";
            return model;
          },
        },
      },
      {
        path: "/product-list",
        element: <ProductList />,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: true,
              Group: null,
              Selected: false,
              Text: "",
              Value: "",
            };
            model.Text = "Danh sách sản phẩm";
            model.Value = "/product";
            return model;
          },
        },
      },
      {
        path: "/list-menu",
        element: <ListMenu />,
        handle: {
          crumb: () => {
            let model: SelectListItem = {
              Disabled: true,
              Group: null,
              Selected: false,
              Text: "",
              Value: "",
            };
            model.Text = "Danh sách menu";
            model.Value = "/menu";
            return model;
          },
        },
      },
    ],
  },
  {
    path: "auth",
    element: <LayoutAuth />, // Define your Auth layout component here
    children: [
      {
        path: "login",
        element: <AuthenticationTitle />, // Create a Login page component
      },

      // Add more authentication-related routes here
    ],
  },
]);

export default router;
