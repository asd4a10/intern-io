import Dexie from "dexie";

class MyDatabase extends Dexie {
  applications: Dexie.Table; // Define a table

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      applications: "++id, companyId, statusId", // Example schema
    });

    // Define the TypeScript type for the 'applications' table
    this.applications = this.table("applications");
  }
}

const applicationDB = new MyDatabase();

export interface IApplicationStatusType {
  id: number;
  companyId: number;
  statusId: number;
}
export const addApplicationStatus = async (
  companyId: number,
  statusId: number,
) => {
  return applicationDB.applications.add({ companyId, statusId });
};

export const getApplicationStatuses = async () => {
  return applicationDB.applications.toArray();
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
  return applicationDB.applications.update(id, { statusId });
};

export const clearApplicationStatuses = async () => {
  return applicationDB.applications.clear();
};
export default applicationDB;
