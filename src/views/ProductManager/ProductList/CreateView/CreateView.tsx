import { Tabs } from "@mantine/core";
import ItemCategoryCommand from "./ItemCategoryCommand";
import ItemCommand from "./ItemCommand";
import ItemSeoCommand from "./ItemSeoCommand";
import ItemTechnicalCommonCommand from "./ItemTechnicalCommonCommand";
import { TblItemCommand } from "../../../../model/ProductList";

const CreateView = ({ refetch, data }: CreateViewProps) => {
  return (
    <Tabs defaultValue="info1">
      <Tabs.List>
        <Tabs.Tab value="info1">Thông tin 1</Tabs.Tab>
        <Tabs.Tab value="info2">Thông tin 2</Tabs.Tab>
        <Tabs.Tab value="info3">Thông tin 3</Tabs.Tab>
        <Tabs.Tab value="info4">Thông tin 4</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="info1">
        <ItemCommand refetch={refetch} data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="info2">
        <ItemCategoryCommand />
      </Tabs.Panel>
      <Tabs.Panel value="info3">
        <ItemSeoCommand />
      </Tabs.Panel>
      <Tabs.Panel value="info4">
        <ItemTechnicalCommonCommand />
      </Tabs.Panel>
    </Tabs>
  );
};

type CreateViewProps = {
  refetch: Function;
  data?: TblItemCommand;
};

export default CreateView;
