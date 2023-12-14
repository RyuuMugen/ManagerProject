import React from "react";
import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
} from "@elastic/eui";
import { Menu, Tooltip } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const AppSearch = ({
  onChangeText,
  loading,
  selectedOptions,
  onChange,
  onSearch,
  dataSelectSearch,
}: AppSearchProps) => {
  return (
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
                          options={dataSelectSearch}
                          selectedOptions={selectedOptions}
                          onChange={onChange}
                          fullWidth={true}
                          singleSelection={true}
                          isDisabled={loading}
                          isCaseSensitive
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
  );
};

export default AppSearch;

type AppSearchProps = {
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (selectedItems: any) => void;
  onSearch: () => void;
  loading: boolean;
  selectedOptions: EuiComboBoxOptionOption<unknown>[] | undefined;
  dataSelectSearch: any[];
};
