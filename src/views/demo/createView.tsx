import {
  Box,
  Button,
  ComboboxItem,
  Divider,
  Group,
  LoadingOverlay,
  Select,
  TextInput,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NotificationExtension } from "../../_base/extension/NotificationExtension";
import {
  isNullOrUndefined,
  isNullOrUndefinedArry,
} from "../../_base/extension/StringExtension";
import Repository from "../../_base/helper/HttpHelper";
import { MessageResponse } from "../../model/MessageResponse";
import { TblTestModel } from "../../model/TblTestModel";

const CreateView = function ({
  onClose,
  load,
}: {
  onClose: any;
  load: number;
}) {
  const entity: TblTestModel = {
    name: "",
    parent: null,
    des: "",
    inactive: null,
    createby: "",
    lastupdateby: "",
    createdate: new Date().toUTCString(),
    id: 0,
    lastupdatedate: null,
    ondelete: null,
  };
  // title
  const title = "Tạo mới kho !";
  // const { isCreate, setIsCreate } = useContext(CreateContext);
  const form = useForm<TblTestModel>({
    initialValues: {
      ...entity,
    },

    validate: {
      name: hasLength({ min: 2, max: 100 }, "Tên phải chưa từ 2-10 kí tự !"),
      des: isNotEmpty("Mô tả chưa nhập !"),
    },
  });

  //
  const repository = new Repository(process.env.REACT_APP_Demo_APP_API_URL);
  const [visible, { toggle, close, open }] = useDisclosure(false);
  const [isContinue, setIsContinue] = useState(true);
  useEffect(() => {
    callApiGetData();
  }, []);

  //combobox

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });
  const [dataDrop, setDataDrop] = useState<ComboboxItem[]>([]);
  // #region capp api
  const callApiGetData = async () => {
    let urlCreate = `/demo/create`;
    let callapi = await repository.get<MessageResponse<TblTestModel>>(
      urlCreate
    );
    if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
      const dataApi = callapi?.data;
      if (dataApi != null && !isNullOrUndefined(dataApi))
        form.setValues(dataApi);
      let urlAll = `/demo/get-all`;
      let callapigetall = await repository.get<MessageResponse<TblTestModel[]>>(
        urlAll
      );
      if (
        !isNullOrUndefined(callapigetall) &&
        !isNullOrUndefinedArry(callapigetall?.data)
      ) {
        const dataApiAll = callapigetall?.data;
        let dataarry: ComboboxItem[] = [];
        if (dataApiAll !== undefined)
          for (let index = 0; index < dataApiAll.length; index++) {
            const element = dataApiAll[index];
            const elementp: ComboboxItem = {
              label: element.name,
              value: element.id.toString(),
            };
            dataarry.push(elementp);
          }
        setDataDrop(dataarry);
      }
      close();
    } else {
      NotificationExtension.Fails("Dữ liệu không tồn tại");
      modals.closeAll();
    }
  };
  const apiCreate = async (e: TblTestModel) => {
    open();
    let urlCreate = `/demo/create`;
    let callapi = await repository.post<MessageResponse<boolean>>(urlCreate, e);
    if (!isNullOrUndefined(callapi) && callapi?.success) {
      // nếu chọn tiếp tục thêm, sẽ làm mới form
      if (isContinue)
        form.setValues({
          ...entity,
        });
      onClose(load + 1);
      NotificationExtension.Success("Thêm thành công !");
    } else if (callapi != null) NotificationExtension.Fails("Thêm thất bại !");
    close();
    if (!isContinue) modals.closeAll();
  };
  //#endregion

  const formCreate = (
    <>
      <Divider my="sm" />
      <Box
        className="flex-none"
        component="form"
        miw={600}
        maw={600}
        mx="auto"
        onSubmit={form.onSubmit((e: TblTestModel) => {
          toggle();
          apiCreate(e);
        })}
      >
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <TextInput
          label="Tên: "
          placeholder="Tên..."
          withAsterisk
          mt="md"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Mô tả:"
          placeholder="Mô tả..."
          mt="md"
          withAsterisk
          {...form.getInputProps("des")}
        />

        <Select
          label="Thuộc kho: "
          placeholder="Chọn kho..."
          data={dataDrop}
          searchable
          withAsterisk
          {...form.getInputProps("parent")}
          mb={"lg"}
        />
        <Divider my="sm" />

        <Group justify="flex-end" mt="lg">
          <Button
            type="submit"
            color="#3598dc"
            onClick={() => {
              setIsContinue(false);
            }}
            leftSection={<IconCheck size={18} />}
          >
            Lưu
          </Button>
          <Button
            type="submit"
            color="#3598dc"
            onClick={() => setIsContinue(true)}
            leftSection={<IconPlus size={18} />}
          >
            Tiếp tục thêm
          </Button>

          <Button
            variant="outline"
            color="black"
            type="submit"
            onClick={() => modals.closeAll()}
            leftSection={<IconX size={18} />}
          >
            Đóng
          </Button>
        </Group>
      </Box>
    </>
  );

  return <>{formCreate}</>;
};

export default CreateView;
