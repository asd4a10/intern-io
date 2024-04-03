import Dexie from "dexie";

const applicationDB = new Dexie("LocalDatabase");
applicationDB.version(1).stores({
  applications: "++id, companyId, statusId",
});

export interface IApplicationStatusType {
  id: number;
  companyId: number;
  statusId: number;
}
export const addApplicationStatus = async (
  companyId: number,
  statusId: number,
) => {
  return await applicationDB.applications.add({ companyId, statusId });
};

export const getApplicationStatuses = async () => {
  return await applicationDB.applications.toArray();
};

export const getApplicationStatusById = async (
  companyId: number,
): Promise<IApplicationStatusType | undefined> => {
  const arr: IApplicationStatusType[] =
    await applicationDB.applications.toArray();
  return arr.find(
    (application: IApplicationStatusType) => application.companyId == companyId,
  );
};

// Updating status would also be based on statusId
export const updateApplicationStatus = async (id: number, statusId: number) => {
  return await applicationDB.applications.update(id, { statusId });
};

export const clearApplicationStatuses = async () => {
  return await applicationDB.applications.clear();
};
export default applicationDB;
