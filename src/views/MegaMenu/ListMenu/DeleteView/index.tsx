import { Button, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import { deleteItemCategory } from "../../../../api/ApiMegaMenu";

const DeleteView = ({ idItem, refetch }: DeleteProduct) => {
  const handleDeleteProduct = async () => {
    await deleteItemCategory(idItem);
    refetch();
    modals.closeAll();
  };

  return (
    <div>
      <Text size="24px"> bạn có chắc chắn muốn xóa các sản phẩm này ?</Text>
      <Group justify="center" mt="lg">
        <Button
          type="button"
          color="#3598dc"
          onClick={handleDeleteProduct}
          leftSection={<IconCheck size={18} />}
        >
          Xóa
        </Button>
        <Button
          type="button"
          color="#3598dc"
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          Hủy
        </Button>
      </Group>
    </div>
  );
};

type DeleteProduct = {
  idItem: number[];
  refetch: Function;
};

export default DeleteView;
