import {
  CriteriaWithPagination,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiEmptyPrompt,
  EuiHealth,
  EuiHighlight,
  EuiSpacer,
  EuiTableSelectionType,
  Pagination,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from "@elastic/eui";
import { Divider, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { ReactNode, useState } from "react";
import { NotificationExtension } from "../../../../_base/extension/NotificationExtension";
import {
  isNullOrEmpty,
  isNullOrUndefined,
  isNullOrUndefinedArry,
} from "../../../../_base/extension/StringExtension";
import Repository from "../../../../_base/helper/HttpHelper";
import { paginationBase } from "../../../../_base/model/_base/BaseTable";
import { ParamSearchBase } from "../../../../_base/model/_base/ParamSearchBase";
import AppAction from "../../../../common/AppAction";
import AppSearch from "../../../../common/AppSearch";
import { MessageResponse } from "../../../../model/MessageResponse";
import CreateView from "../CreateView/CreateView";
import DeleteView from "../DeleteView";
import { getDataListProduct } from "../../../../api/ApiProduct";
import { useQuery } from "@tanstack/react-query";
import { TblItemCommand } from "../../../../model/ProductList";

const noItemsFoundMsg = "Không có kết quả tìm kiếm phù hợp...";

const visColorsBehindText = euiPaletteColorBlindBehindText();

const optionSearch = [
  {
    value: true,
    label: "Kích hoạt",
    "data-test-subj": "titanOption",
    color: visColorsBehindText[0],
  },
  {
    value: false,
    label: "Chưa kích hoạt",
    color: visColorsBehindText[1],
  },
];
const ProductList = () => {
  const [toltal, setTotal] = useState(0);

  const handleGetDataProduct = async () => {
    const data = await getDataListProduct(`?Active=true&Skip=0&Take=100`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getDataProduct"],
    queryFn: handleGetDataProduct,
  });

  const columns: Array<EuiBasicTableColumn<TblItemCommand>> = [
    {
      field: "attribute1",
      name: "Tên sản phẩm",
      footer: <em>Page totals: {toltal}</em>,
      sortable: true,
      truncateText: true,
    },
    {
      field: "attribute2",
      name: "Hãng sản xuất",
      footer: <em>Page totals: {toltal}</em>,
      sortable: true,
      truncateText: true,
    },
    {
      field: "attribute3",
      name: "Mô tả",
      footer: <em>Page totals: {toltal}</em>,
      sortable: true,
      truncateText: true,
    },
    {
      field: "attribute4",
      name: "Giá Sản phẩm",
      footer: <em>Page totals: {toltal}</em>,
      sortable: true,
      truncateText: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<TblItemCommand[]>([]);
  const [message, setMessage] = useState<ReactNode>(
    <EuiEmptyPrompt
      title={<h3>Dữ liệu rỗng !</h3>}
      titleSize="xs"
      body="Tải lại dữ liệu nếu trường hợp bạn không thấy có dữ liệu hiển thị !"
      actions={
        <EuiButton
          size="s"
          key="loadUsers"
          onClick={async () => {
            await loadUsers(pagination.pageIndex, pagination.pageSize);
          }}
        >
          Tải dữ liệu !
        </EuiButton>
      }
    />
  );
  const [error, setError] = useState<string | undefined>();
  const [pagination, setPagination] = useState<Pagination>(paginationBase);
  const [selectedOptions, setSelected] = useState();
  const [paramSearch, setParamSearch] = useState<ParamSearchBase>();
  const [isSelectedItem, setSelectedItems] = useState<TblItemCommand[]>([]);

  const loadUsers = async (
    index: number,
    size?: number,
    keyWord?: string,
    inActive?: boolean
  ) => {
    setMessage("Đang lấy dữ liệu...");
    setLoading(true);
    setUsers([]);
    setError(undefined); //get-list?KeySearch=1&Active=true&Skip=1&Take=1
    const repository = new Repository(process.env.REACT_APP_Demo_APP_API_URL);
    try {
      let urlSearch = `/Demo/get-list?Skip=${index * (size ?? 0)}&Take=${size}`;
      if (!isNullOrEmpty(keyWord))
        urlSearch = urlSearch + `&KeySearch=` + keyWord;
      if (!isNullOrUndefined(inActive))
        urlSearch = urlSearch + `&Active=` + inActive;
      let callapi = await repository.get<MessageResponse<TblItemCommand[]>>(
        urlSearch
      );
      if (isNullOrUndefined(callapi) || isNullOrUndefinedArry(callapi?.data)) {
        setMessage(noItemsFoundMsg);
        setTotal(0);
      } else {
        setUsers(callapi?.data ?? []);
        setPagination({
          ...pagination,
          totalItemCount: callapi?.totalCount ?? 0,
        });
        setTotal(callapi?.totalCount ?? 0);
      }
      return callapi?.data;
    } catch (error: any) {
      setError("Có lỗi xảy ra khi tải dữ liệu !");
      return null;
    } finally {
      setLoading(false);
    }
  };
  const onTableChange = async ({
    page: { index, size },
  }: CriteriaWithPagination<TblItemCommand>) => {
    setPagination({ ...pagination, pageIndex: index, pageSize: size });
  };
  const onSearch = async () => {
    await loadUsers(
      pagination.pageIndex,
      pagination.pageSize,
      paramSearch?.keyWord,
      paramSearch?.inActive
    );
  };

  const onChange = (selectedOptions: any) => {
    setSelected(selectedOptions);
    if (!isNullOrUndefinedArry(selectedOptions)) {
      const value = selectedOptions[0].value;
      if (!isNullOrUndefined(value))
        setParamSearch({ ...paramSearch, inActive: value });
    } else setParamSearch({ ...paramSearch, inActive: undefined });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    if (!isNullOrUndefined(key))
      setParamSearch({ ...paramSearch, keyWord: key });
  };

  const onSelectionChange = (selectedItems: TblItemCommand[]) => {
    setSelectedItems(selectedItems);
  };
  const selection: EuiTableSelectionType<TblItemCommand> = {
    // tieu chi de checkbox
    selectable: (user: TblItemCommand) => true,
    selectableMessage: (selectable: boolean) =>
      !selectable ? "User is currently offline" : "",
    onSelectionChange,
  };

  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <>
          <div color="white">
            <Title order={5}>Thêm mới sản phẩm</Title>
          </div>
        </>
      ),
      children: <CreateView refetch={refetch} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });

  const openModalEdit = () => {
    debugger;
    if (
      isSelectedItem &&
      (isSelectedItem.length < 1 || isSelectedItem.length > 1)
    )
      NotificationExtension.Warn("Xin vui lòng chọn 1 sản phẩm để chỉnh sửa !");
    else {
      editItem(isSelectedItem[0]);
    }
  };

  const openModalDelete = () => {
    if (isSelectedItem && isSelectedItem.length < 1)
      NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
    else {
      const ids = isSelectedItem;
      deleteItem(ids.map((item) => item.id));
    }
  };

  function deleteItem(idItem: number[]) {
    modals.openConfirmModal({
      title: (
        <>
          <Title order={5}>Xóa sản phẩm</Title>
        </>
      ),
      children: <DeleteView idItem={idItem} refetch={refetch} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  }

  function editItem(item: TblItemCommand) {
    modals.openConfirmModal({
      title: (
        <>
          <Title order={5}>Chỉnh sửa demo !</Title>
        </>
      ),

      children: <CreateView refetch={refetch} data={item} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  }

  return (
    <>
      <AppAction
        openModal={openModal}
        openModalDelete={openModalDelete}
        openModalEdit={openModalEdit}
      ></AppAction>
      <Divider my="sm" />
      <AppSearch
        loading={loading}
        onChange={onChange}
        onChangeText={onChangeText}
        dataSelectSearch={optionSearch}
        onSearch={onSearch}
        selectedOptions={selectedOptions}
      />
      <EuiSpacer size="l" />
      <EuiBasicTable
        tableCaption="Demo of EuiDataGrid with selection"
        items={data?.data ? data?.data : []}
        itemId="id"
        error={error}
        loading={loading}
        noItemsMessage={isNullOrUndefinedArry(users) ? message : ""}
        selection={selection}
        columns={columns}
        pagination={pagination}
        isSelectable={true}
        hasActions={true}
        responsive={true}
        onChange={onTableChange}
        compressed={true}
      />
    </>
  );
};

export default ProductList;
