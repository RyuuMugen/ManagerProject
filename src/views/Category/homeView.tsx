import {
  CriteriaWithPagination,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiButtonIcon,
  EuiComboBox,
  EuiEmptyPrompt,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHealth,
  EuiHighlight,
  EuiLink,
  EuiSpacer,
  EuiTableSelectionType,
  Pagination,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from "@elastic/eui";
import {
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Text,
  Title,
  Tooltip,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArrowsLeftRight,
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import React, { ReactNode, useEffect, useState } from "react";
import { NotificationExtension } from "../../_base/extension/NotificationExtension";
import {
  isNullOrEmpty,
  isNullOrUndefined,
  isNullOrUndefinedArry,
} from "../../_base/extension/StringExtension";
import Repository from "../../_base/helper/HttpHelper";
import { paginationBase } from "../../_base/model/_base/BaseTable";
import { ParamSearchBase } from "../../_base/model/_base/ParamSearchBase";
import { MessageResponse } from "../../model/MessageResponse";
import CreateView from "./createView";
import DeleteView from "./deleteView";
import EditView from "./editView";
import { TblCategoryModel } from "../../model/TblCategoryModel";
import { API_ROUTE } from "../../const/apiRoute";

// Context
//export const ModelContext = createContext<any>(null);
//
const userData: TblCategoryModel[] = [];

const noItemsFoundMsg = "Không có kết quả tìm kiếm phù hợp...";

const visColors = euiPaletteColorBlind();
const visColorsBehindText = euiPaletteColorBlindBehindText();
const optionsStatic = [
  {
    value: {
      size: 5,
    },
    label: "Titan",
    "data-test-subj": "titanOption",
    color: visColorsBehindText[0],
  },
  {
    value: {
      size: 5,
    },
    label: "Enceladus",
    color: visColorsBehindText[1],
  },
  {
    value: {
      size: 5,
    },
    label: "Mimas",
    color: visColorsBehindText[2],
  },
  {
    value: {
      size: 5,
    },
    label: "Dione",
    color: visColorsBehindText[3],
  },
  {
    value: {
      size: 5,
    },
    label: "Iapetus",
    color: visColorsBehindText[4],
  },
  {
    value: {
      size: 5,
    },
    label: "Phoebe",
    color: visColorsBehindText[5],
  },
  {
    value: {
      size: 5,
    },
    label: "Rhea",
    color: visColorsBehindText[6],
  },
  {
    value: {
      size: 5,
    },
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    value: {
      size: 5,
    },
    label: "Tethys",
    color: visColorsBehindText[8],
  },
  {
    value: {
      size: 5,
    },
    label: "Hyperion",
    color: visColorsBehindText[9],
  },
];
const optionInactive = [
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
const HomeView = () => {
  const [toltal, setTotal] = useState(0);

  //#region VARIBLE
  const columns: Array<EuiBasicTableColumn<TblCategoryModel>> = [
    {
      field: "categroyName",
      name: "Danh mục",
      footer: <em>Page totals: {toltal}</em>,
      sortable: true,
      truncateText: true,
      render: (username: string) => (
        <EuiLink
          target="_blank"
          onClick={(e: any) => {
            console.log(e);
            if (isNullOrUndefined(username))
              NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
            else {
              const id = users.find((x) => x.categroyName === username);
              if (id !== undefined && id.id > 0) editItem(id.id);
              else NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
            }
          }}
        >
          {username}
        </EuiLink>
      ),
      mobileOptions: {
        render: (user: TblCategoryModel) => <span>{user.categroyName}</span>,
        header: false,
        truncateText: false,
        enlarge: true,
        width: "100%",
      },
    },
    {
      field: "categroyName",
      name: "Link web",
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "categroyName",
      name: "Nội dung nổi bật",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "Nổi bật",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "id",
      name: "ID",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "View",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "SP",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "STT",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "description",
      name: "Hiển thị nội dung",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "Thuộc tính",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "inactive",
      name: "Trạng thái",
      dataType: "boolean",
      render: (online: TblCategoryModel["inactive"]) => {
        const color = online ? "success" : "danger";
        const label = online ? "Kích hoạt" : "Chưa kích hoạt";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
      sortable: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      name: "Actions",
      render: (online: TblCategoryModel) => {
        return (
          <>
            <EuiFlexGroup
              responsive={true}
              wrap={false}
              gutterSize="s"
              alignItems="center"
            >
              <EuiFlexItem grow={false}>
                <EuiButtonIcon
                  iconType="documentEdit"
                  aria-label="Dashboard"
                  color="success"
                  onClick={(e: any) => {
                    if (isNullOrUndefined(online))
                      NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
                    else {
                      editItem(online.id);
                    }
                  }}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonIcon
                  iconType="trash"
                  color="danger"
                  onClick={(e: any) => {
                    if (isNullOrUndefined(online))
                      NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
                    else {
                      deleteItem([online.id]);
                    }
                  }}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </>
        );
      },
    },
  ];
  //#endregion

  //#region state
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<TblCategoryModel[]>([]);
  const [isFrist, setIsFrist] = useState(true);
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
  const [options, setOptions] = useState(optionsStatic);
  const [selectedOptions, setSelected] = useState();
  const [selectedOptions1, setSelected1] = useState();
  const [paramSearch, setParamSearch] = useState<ParamSearchBase>();
  const [isSelectedItem, setSelectedItems] = useState<TblCategoryModel[]>([]);
  const [deleteViewStatus, setDeleteViewStatus] = useState(0);

  //#endregion

  //#region Effect
  const handleDeleteViewClose = (status: number) => {
    // Cập nhật trạng thái từ DeleteView khi modal đóng
    setDeleteViewStatus(status);
  };
  useEffect(() => {
    if (isFrist) setIsFrist(false);
    else
      loadUsers(
        pagination.pageIndex,
        pagination.pageSize,
        paramSearch?.keyWord,
        paramSearch?.inActive
      );
  }, [pagination.pageIndex, pagination.pageSize, deleteViewStatus]);

  //#endregion

  //#region  varible funtion
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
      let urlSearch = API_ROUTE.GET_LIST_CATEGORY+`?Skip=${index * (size ?? 0)}&Take=${size}`;
      if (!isNullOrEmpty(keyWord))
        urlSearch = urlSearch + `&KeySearch=` + keyWord;
      if (!isNullOrUndefined(inActive))
        urlSearch = urlSearch + `&Active=` + inActive;
      let callapi = await repository.get<MessageResponse<TblCategoryModel[]>>(
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
  }: CriteriaWithPagination<TblCategoryModel>) => {
    setPagination({ ...pagination, pageIndex: index, pageSize: size });
  };
  const onSearch = async (event: any) => {
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

  const onChange1 = (selectedOptions: any) => {
    setSelected1(selectedOptions);
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    if (!isNullOrUndefined(key))
      setParamSearch({ ...paramSearch, keyWord: key });
  };

  const renderOption = (
    option: any,
    searchValue: any,
    contentClassName: string | undefined
  ) => {
    const { color, label, value } = option;
    const dotColor = visColors[visColorsBehindText.indexOf(color)];
    return (
      <EuiHealth color={dotColor}>
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          &nbsp;
          <span>({value.size})</span>
        </span>
      </EuiHealth>
    );
  };

  const onSelectionChange = (selectedItems: TblCategoryModel[]) => {
    setSelectedItems(selectedItems);
  };
  const selection: EuiTableSelectionType<TblCategoryModel> = {
    // tieu chi de checkbox
    selectable: (user: TblCategoryModel) => true,
    selectableMessage: (selectable: boolean) =>
      !selectable ? "User is currently offline" : "",
    onSelectionChange,
  };

  //#endregion

  //mantine
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <>
          <div color="white">
            <Title order={5}>Thêm mới danh mục !</Title>
          </div>
        </>
      ),
      children: (
        <CreateView onClose={handleDeleteViewClose} load={deleteViewStatus} />
      ),
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });

  const openModalEdit = () => {
    if (isSelectedItem && isSelectedItem.length < 1)
      NotificationExtension.Warn("Xin vui lòng chọn dữ liệu !");
    else {
      const id = isSelectedItem[0];
      editItem(id.id);
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
          <Title order={5}>Xóa demo !</Title>
        </>
      ),
      children: (
        <DeleteView
          onClose={handleDeleteViewClose}
          load={deleteViewStatus}
          ids={idItem}
        />
      ),
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
      onConfirm: () => {
        console.log(1111);
      },
    });
  }

  function editItem(idItem: number) {
    const id = idItem;
    modals.openConfirmModal({
      title: (
        <>
          <Title order={5}>Chỉnh sửa demo !</Title>
        </>
      ),

      children: (
        <EditView
          onClose={handleDeleteViewClose}
          load={deleteViewStatus}
          id={id}
        />
      ),
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  }

  return (
    <>
      <Box style={{ overflow: "hidden" }}>
        <Box mx="auto">
          <Group wrap="nowrap" justify="flex-end">
            <Button
              onClick={openModal}
              leftSection={<IconPlus size={14} />}
              color="blue"
              variant="outline"
            >
              Thêm mới
            </Button>
            <Button
              leftSection={<IconEdit size={14} />}
              onClick={openModalEdit}
              color="orange"
              variant="outline"
            >
              Chỉnh sửa
            </Button>
            <Button
              leftSection={<IconTrash size={14} />}
              onClick={openModalDelete}
              color="red"
              variant="outline"
            >
              Xóa (Đã chọn)
            </Button>
            <Menu shadow="md" trigger="hover" openDelay={100} closeDelay={200}>
              <Menu.Target>
                <Button
                  rightSection={<IconChevronDown size={14} />}
                  leftSection={<IconDotsVertical size={14} />}
                  color="violet"
                  variant="outline"
                >
                  Thao tác khác
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessageCircle
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Messages
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Gallery
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSearch style={{ width: rem(14), height: rem(14) }} />
                  }
                  rightSection={
                    <Text size="xs" c="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconArrowsLeftRight
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Transfer my data
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Delete my account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
      </Box>
      <Divider my="sm" />
      {/* <EuiSpacer size="xs" /> */}
      <EuiFlexGroup>
        <EuiFormRow label="Tìm kiếm :">
          <EuiFlexGroup alignItems="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiFieldSearch
                placeholder="Tìm kiếm..."
                fullWidth
                aria-label="An example of search with fullWidth"
                onChange={onChangeText}
                disabled={loading}
                append={
                  <Menu
                    trigger="hover"
                    closeOnClickOutside={false}
                    shadow="md"
                    width={500}
                    openDelay={100}
                    closeDelay={300}
                  >
                    <Menu.Target>
                      <Tooltip label="Hiển thị tùy chọn tìm kiếm">
                        <IconChevronDown
                          className="Menu_IconChevronDown_Search"
                          width={35}
                          size={20}
                        />
                      </Tooltip>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Tùy chọn tìm kiếm</Menu.Label>
                      <Menu.Item closeMenuOnClick={false}>
                        <EuiFormRow label="Trạng thái: ">
                          <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Chọn..."
                            options={optionInactive}
                            selectedOptions={selectedOptions}
                            onChange={onChange}
                            fullWidth={true}
                            singleSelection={true}
                            isDisabled={loading}
                            isCaseSensitive
                          />
                        </EuiFormRow>
                      </Menu.Item>
                      <Menu.Item closeMenuOnClick={false}>
                        <EuiFormRow label="Tên: ">
                          <EuiComboBox
                            aria-label="Accessible screen reader label"
                            placeholder="Chọn..."
                            options={options}
                            selectedOptions={selectedOptions1}
                            onChange={onChange1}
                            fullWidth={true}
                            renderOption={renderOption}
                            isDisabled={loading}
                          />
                        </EuiFormRow>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                }
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                isLoading={loading}
                iconType="lensApp"
                isDisabled={loading}
                onClick={onSearch}
              >
                Tìm kiếm
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFormRow>
      </EuiFlexGroup>

      <EuiSpacer size="l" />
      <EuiBasicTable
        tableCaption="Demo of EuiDataGrid with selection"
        items={users}
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

export default HomeView;
