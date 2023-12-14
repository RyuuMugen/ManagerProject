export interface TblCategoryModel {
    id: number;
    categroyCode: string | null;
    categroyName: string;
    idParent: number | null;
    description: string | null;
    creationDate: string | null;
    createdBy: string | null;
    lastUpdateDate: string | null;
    lastUpdatedBy: string | null;
    lastUpdateLogin: number | null;
    orgId: number | null;
    categoryType: string | null;
    inactive: boolean | null;
}