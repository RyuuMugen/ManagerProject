import { Box, Button, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import {
  createItemProduct,
  modifyItemProduct,
} from "../../../../api/ApiProduct";
import { TblItemCommand } from "../../../../model/ProductList";
import QuillEditor from "../../../../common/QuillEditor";

const ItemCommand = ({ refetch, data }: CreateViewProps) => {
  const [dataItemCommand, setDataItemCommand] = useState({
    tblItemCommand: {
      orgId: 0,
      parentId: 0,
      barcode: "",
      itemCode: "",
      itemName: "Product",
      itemCost: 0,
      description: "",
      inUse: "1",
      barcodeUsed: "1",
      shortName: "",
      discountValue: 0,
      warrantyByPartner: "1",
      warrantyByCus: "1",
      vat: 0,
      isPromotional: "1",
      accessory: "1",
      fullModelCode: "",
      profit: 0,
      categoryId: 0,
      createdBy: 0,
      lastUpdateDate: "",
      lastUpdatedBy: "1",
      lastUpdateLogin: "1",
      creationDate: "",
      attribute1: "",
      attribute2: "",
      attribute3: "",
      attribute4: "",
      attribute5: "",
      attribute6: "",
      attribute7: "",
      attribute8: "",
      attribute9: "",
      attribute10: "",
      attribute11: "",
      attribute12: "",
      attribute13: "",
      attribute14: "",
      attribute15: "",
      erpInventoryItemId: 0,
      marketPrice: 0,
      unitWeight: 0,
      weightUomCode: "1",
      volumeUomCode: "1",
      unitVolume: 0,
      primaryUomCode: "1",
      primaryUnitOfMeasure: "1",
      dimensionUomCode: "1",
      unitLength: 0,
      unitWidth: 0,
      unitHeight: 0,
      secondaryUomCode: "1",
    },
  });

  const [modal, setModel] = useState("");

  const handleChangeValue = (e: any, label: string) => {
    setDataItemCommand({
      tblItemCommand: {
        ...dataItemCommand.tblItemCommand,
        [label]: e,
      },
    });
  };

  const handleCreateProduct = async () => {
    if (data) {
      await modifyItemProduct(dataItemCommand);
    } else {
      await createItemProduct(dataItemCommand);
    }
    refetch();
    modals.closeAll();
  };

  useEffect(() => {
    if (data) {
      setDataItemCommand({
        tblItemCommand: data,
      });
    }
  }, [data]);

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
          label={"Tên sản phẩm"}
          placeholder={"Tên sản phẩm"}
          withAsterisk
          mt="md"
          type="text"
          value={dataItemCommand?.tblItemCommand.attribute1}
          onChange={(e) => handleChangeValue(e, "attribute1")}
        />

        <TextInput
          label={"Hãng sản xuất"}
          placeholder={"Hãng sản xuất"}
          withAsterisk
          mt="md"
          type="text"
          value={dataItemCommand?.tblItemCommand.attribute2}
          onChange={(e) => handleChangeValue(e, "attribute2")}
        />

        <TextInput
          label={"Mô tả"}
          placeholder={"Mô tả"}
          withAsterisk
          mt="md"
          type="text"
          value={dataItemCommand?.tblItemCommand.attribute3}
          onChange={(e) => handleChangeValue(e, "attribute3")}
        />

        <QuillEditor
          toolbarId="toolbar"
          setValue={setModel}
          onChangeValue={(html: string) =>
            handleChangeValue(html, "description")
          }
        />

        <QuillEditor
          toolbarId="toolbar2"
          setValue={setModel}
          onChangeValue={(html: string) =>
            handleChangeValue(html, "description")
          }
        />

        <TextInput
          label={"màu"}
          placeholder={"màu"}
          withAsterisk
          mt="md"
          type="text"
          value={dataItemCommand?.tblItemCommand.attribute4}
          onChange={(e) => handleChangeValue(e.target.value, "Color")}
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

export default ItemCommand;
