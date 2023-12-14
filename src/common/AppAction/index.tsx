import React from "react";
import { Box, Button, Group, Menu, Text, rem } from "@mantine/core";
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

const AppAction = ({
  openModal,
  openModalEdit,
  openModalDelete,
  isShowOtherAction = false,
}: AppActionProps) => {
  return (
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
          {isShowOtherAction && (
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
          )}
        </Group>
      </Box>
    </Box>
  );
};

export default AppAction;

type AppActionProps = {
  openModal: () => void;
  openModalEdit: () => void;
  openModalDelete: () => void;
  isShowOtherAction?: boolean;
};
