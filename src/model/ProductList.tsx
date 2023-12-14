export interface TblItemCommand {
  orgId: number;
  id: number;
  parentId: number;
  barcode: string;
  itemCode: string;
  itemName: string;
  itemCost: number;
  description: string;
  inUse: string;
  barcodeUsed: string;
  shortName: string;
  discountValue: number;
  warrantyByPartner: string;
  warrantyByCus: string;
  vat: number;
  isPromotional: string;
  accessory: string;
  fullModelCode: string;
  profit: number;
  categoryId: number;
  createdBy: number;
  lastUpdateDate: string;
  lastUpdatedBy: string;
  lastUpdateLogin: string;
  creationDate: string;
  attribute1: string;
  attribute2: string;
  attribute3: string;
  attribute4: string;
  attribute5: string;
  attribute6: string;
  attribute7: string;
  attribute8: string;
  attribute9: string;
  attribute10: string;
  attribute11: string;
  attribute12: string;
  attribute13: string;
  attribute14: string;
  attribute15: string;
  erpInventoryItemId: number;
  marketPrice: number;
  unitWeight: number;
  weightUomCode: string;
  volumeUomCode: string;
  unitVolume: number;
  primaryUomCode: string;
  primaryUnitOfMeasure: string;
  dimensionUomCode: string;
  unitLength: number;
  unitWidth: number;
  unitHeight: number;
  secondaryUomCode: string;
}

interface TblItemCategoryCommand {
  id: number;
  categroyCode: string;
  categroyName: string;
  idParent: number;
  description: string;
  createdBy: number;
  lastUpdateDate: string;
  lastUpdatedBy: number;
  lastUpdateLogin: number;
  orgId: number;
  creationDate: string;
  itemItemId: number;
  categoryId: number;
}

interface TblItemSeoCommand {
  id: number;
  categroyCode: string;
  categroyName: string;
  idParent: number;
  description: string;
  createdBy: number;
  lastUpdateDate: string;
  lastUpdatedBy: number;
  lastUpdateLogin: number;
  orgId: number;
  invItemId: number;
  categoryId: number;
}

interface TblItemTechnicalCommonCommand {
  id: number;
  itemTecCode: string;
  itemTecName: string;
  description: string;
  creationDate: string;
  createdBy: number;
  lastUpdateDate: string;
  lastUpdatedBy: number;
  lastUpdateLogin: number;
  orgId: number;
  invItemId: number;
}

interface TblItemImageCommand {
  id: number;
  imageCode: string;
  imageName: string;
  description: string;
  createdBy: number;
  lastUpdateDate: string;
  lastUpdatedBy: number;
  lastUpdateLogin: number;
  orgId: number;
  invItemId: number;
  image: string;
}

export interface DetailProduct {
  tblItemCommand: TblItemCommand;
  tblItemCategoryCommands: TblItemCategoryCommand[];
  tblItemSeoCommands: TblItemSeoCommand[];
  tblItemTechnicalCommonCommands: TblItemTechnicalCommonCommand[];
  tblItemImageCommands: TblItemImageCommand[];
}
