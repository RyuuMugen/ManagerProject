import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { LinksGroupProps } from "../../_base/model/_base/LinksGroupProps";

export const _sideNavData: LinksGroupProps[] = [
  {
    label: "Trang chủ",
    icon: IconGauge ,
    // link: "/",
  },
  {
    label: "Quản lý bán hàng",
  //  link: "/demo",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách đơn hàng",
        link: "unit/grid",
      },
    ],
  },
  {
    label: "Quản lý sản phẩm",
   // link: "",
    icon: IconCalendarStats,
    links: [
      {
        label: "Danh sách sản phẩm",
        link: "/product-list",
      },
      {
        label: "Trao đổi của người dùng",
        link: "/product-list",
      },
      {
        label: "Đánh giá của người dùng",
        link: "/product-list",
      },
      {
        label: "Bảng giá cập nhật",
        link: "/product-list",
      },
      {
        label: "Danh mục sản phẩm",
        link: "/category",
      },
      {
        label: "Danh mục cho SEO",
        link: "/product-list",
      },
      {
        label: "Danh sách thương hiệu",
        link: "/product-list",
      },
      {
        label: "Thuộc tính sản phẩm",
        link: "/product-list",
      },
      {
        label: "Bộ sưu tập",
        link: "/product-list",
      },
      {
        label: "Nhóm thông số kỹ thuật",
        link: "/product-list",
      },
      {
        label: "SP/Dịch vụ đi kèm",
        link: "/product-list",
      },
      {
        label: "Nhóm cấu hình sản phẩm",
        link: "/product-list",
      },
    ],
  },
  {
    label: "Quản lý khách hàng",
  // /  link: "/menu",
    icon: IconPresentationAnalytics ,
    links: [
      {
        label: "Danh sách khách hàng",
        link: "/list-menu",
      },
      {
        label: "Danh sách nhóm khách hàng",
        link: "/list-menu",
      },
      {
        label: "Danh sách khách hàng liên hệ",
        link: "/list-menu",
      },
      {
        label: "Danh sách khách hàng góp ý",
        link: "/list-menu",
      },
      {
        label: "Danh sách khách hàng nhập tin",
        link: "/list-menu",
      },
      {
        label: "Danh sách tổng hợp trao đổi",
        link: "/list-menu",
      },
      {
        label: "Danh sách tổng hợp đánh giá",
        link: "/list-menu",
      },
    ],
  },
  {
    label: "Quản lý Marketing",
  // /  link: "/menu",
    icon: IconFileAnalytics ,
    links: [
      {
        label: "Khuyến mại theo sản phẩm",
        link: "/list-menu",
      },
      {
        label: "Phiếu giảm giá - Voucher",
        link: "/list-menu",
      },
      {
        label: "Danh sách banner",
        link: "/list-menu",
      },
      {
        label: "Banner pop-up",
        link: "/list-menu",
      },
      {
        label: "Poster",
        link: "/list-menu",
      },
      {
        label: "Hình nền website",
        link: "/list-menu",
      },
      {
        label: "Facebook Product Ads",
        link: "/list-menu",
      },
      {
        label: "Cài biểu tượng giảm giá",
        link: "/list-menu",
      },
      {
        label: "Deal/giờ vàng",
        link: "/list-menu",
      },
      {
        label: "Khuyến mại Build PC",
        link: "/list-menu",
      },
      {
        label: "Upload Excel SEO sản phẩm",
        link: "/list-menu",
      },
      {
        label: "Banner Popup",
        link: "/list-menu",
      },
    ],
  },
  {
    label: "Quản lý Nội dung",
  // /  link: "/menu",
    icon: IconAdjustments ,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Sản phẩm cấu hình",
  // /  link: "/menu",
    icon: IconLock,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Xây dựng máy tính",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Tản nhiệt nước",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Quản lý Trả góp",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Quản lý Thống kê",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Quản lý Hệ thống",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Quản lý Form đăng ký",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },
      // {
      //   label: "Danh sách thương hiệu",
      //   icon: "logoMaps",
      //   path: "unit/home",
      // },
    ],
  },
  {
    label: "Quản lý Thu cũ- Đổi mới",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách Menu",
        link: "/list-menu",
      },

    ],
  },
  {
    label: "Quản lý Combo Set",
  // /  link: "/menu",
    icon: IconNotes,
    links: [
      {
        label: "Danh sách",
        link: "/list-menu",
      },
    ],
  },
];
