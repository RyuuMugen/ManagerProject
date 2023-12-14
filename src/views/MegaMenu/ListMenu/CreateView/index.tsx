import { Box, Button, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { TblItemCommand } from "../../../../model/ProductList";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useState } from "react";
import {
  createItemCategory,
  modifyItemCategory,
} from "../../../../api/ApiMegaMenu";

const CreateView = ({ refetch, data }: CreateViewProps) => {
  const [dataCategory, setDataCategory] = useState({
    categroyCode: "",
    categroyName: "",
    idParent: undefined,
    description: "",
    creationDate: "",
    createdBy: 0,
    lastUpdateDate: "",
    lastUpdatedBy: 0,
    lastUpdateLogin: 0,
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setDataCategory({
      ...dataCategory,
      [label]: e.target.value,
    });
  };

  const handleCreateProduct = async () => {
    if (data) {
      await modifyItemCategory(dataCategory);
    } else {
      await createItemCategory(dataCategory);
    }
    refetch();
    modals.closeAll();
  };

  return (
    <>
      <Box
        className="flex-none"
        component="form"
        miw={1200}
        maw={1200}
        mx="auto"
      >
        <LoadingOverlay
          visible={false}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <TextInput
          label={"Tên danh mục"}
          placeholder={"Mã danh mục"}
          withAsterisk
          mt="md"
          type="text"
          value={dataCategory?.categroyName}
          onChange={(e) => handleChangeValue(e, "categroyName")}
        />

        <TextInput
          label={"Mã danh mục"}
          placeholder={"Mã danh mục"}
          withAsterisk
          mt="md"
          type="text"
          value={dataCategory?.categroyCode}
          onChange={(e) => handleChangeValue(e, "categroyCode")}
        />

        <TextInput
          label={"Id danh mục cha"}
          placeholder={"Hãng sản xuất"}
          withAsterisk
          mt="md"
          type="number"
          value={dataCategory?.idParent}
          onChange={(e) => handleChangeValue(e, "idParent")}
        />

        <TextInput
          label={"Mô tả"}
          placeholder={"Mô tả"}
          withAsterisk
          mt="md"
          type="text"
          value={dataCategory?.description}
          onChange={(e) => handleChangeValue(e, "description")}
        />

        <Group justify="flex-end" mt="lg">
          <Button
            type="button"
            color="#3598dc"
            onClick={handleCreateProduct}
            leftSection={<IconCheck size={18} />}
          >
            Lưu
          </Button>
          <Button
            variant="outline"
            color="black"
            type="button"
            onClick={() => modals.closeAll()}
            leftSection={<IconX size={18} />}
          >
            Đóng
          </Button>
        </Group>
      </Box>
    </>
  );
};

type CreateViewProps = {
  refetch: Function;
  data?: TblItemCommand;
};

export default CreateView;
