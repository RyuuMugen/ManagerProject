import { modals } from "@mantine/modals";
import { NotificationExtension } from "../extension/NotificationExtension";
import { LinksGroupProps } from "../model/_base/LinksGroupProps";

export function searchSideNavData(_sideNavData: LinksGroupProps[],searchString: string): LinksGroupProps[] {
  // Convert the search string to lowercase for case-insensitive search
  const searchTerm = searchString.toLowerCase();

  // Filter the sideNavData based on the search term
  const filteredData = _sideNavData.filter((group) => {
    // Check if the group label contains the search term
    if (group.label.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Check if any link label in the group contains the search term
    if (group.links) {
      const hasMatchingLink = group.links.some((link) =>
        link.label.toLowerCase().includes(searchTerm)
      );

      if (hasMatchingLink) {
        return true;
      }
    }

    return false;
  });

  return filteredData;
}


export const recursiveSearch = (items: any[], query: string) => {
  return items
    .map((item) => {
      let isMatch = false; // Biến để kiểm tra xem item hiện tại có khớp không
      if (item.items) {
        const matchingChildren = recursiveSearch(item.items, query);
        if (matchingChildren.length > 0) {
          // Nếu các con thỏa mãn điều kiện tìm kiếm, thì cả cha cũng thỏa mãn
          isMatch = true;
          item = { ...item, items: matchingChildren };
        }
      }
      if (
        item.label.includes(query) ||
        item.name.includes(query) ||
        item.id.includes(query)
      ) {
        isMatch = true;
        // const regex = new RegExp(query, "gi");
        // item.label=item.label.replace(regex,'<strong>'+query+'</strong>');
        //     console.log(item.label)
      }
      return isMatch ? item : null; // Trả về item nếu nó thỏa mãn điều kiện, ngược lại trả về null
    })
    .filter((item) => item !== null); // Lọc bỏ các item là null
};

export function Delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const HanderResponse = async (res: any) => {
  const currentURL = window.location.pathname;
  if (res.code === "ERR_NETWORK")
    NotificationExtension.Fails("Máy chủ không thể kết nối !");
  switch (res.response?.status) {
    case 401:
      NotificationExtension.Fails("Xin vui lòng đăng nhập lại !");
      await Delay(1000);
      window.location.href = "/auth/login?callback=" + currentURL;
      modals.closeAll();
      break;
    case 404:
      NotificationExtension.Fails("Trang web không tồn tại");
      break;
    case 403:
      NotificationExtension.Fails(
        "Bạn không có quyền thực hiện chức năng này !"
      );
      modals.closeAll();
      break;
    case 500:
      NotificationExtension.Fails(
        res?.response?.data?.message ??
          "Có lỗi xảy ra ở máy chủ, xin vui lòng thử lại !"
      );
      modals.closeAll();
      break;
    default:
      break;
  }
};
