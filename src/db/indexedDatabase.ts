import Dexie from "dexie";

class MyDatabase extends Dexie {
  applications: Dexie.Table; // Define a table
  companies: Dexie.Table; // Define a table

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      applications: "++id, companyId, statusId", // Example schema
      companies: "++id, name, link, img, categories, description, statusId",
    });

    // Define the TypeScript type for the 'applications' table
    this.applications = this.table("applications");
    this.companies = this.table("companies");
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

const companyDB = new MyDatabase();

export interface IDBCompany {
  id: number;
  name: string;
  link: string;
  img: string;
  categories: string[];
  description: string;
  statusId: number;
}

export const addCompany = async (company: IDBCompany) => {
  return companyDB.companies.add(company);
};

export const updateCompany = async (company: IDBCompany) => {
  return companyDB.companies.put(company);
};
export const getCompanies = async () => {
  return companyDB.companies.toArray();
};

export const getCompanyById = async (
  companyId: number,
): Promise<IDBCompany> => {
  return companyDB.companies.get(companyId);
};

export const updateCompanyStatus = async (
  companyId: number,
  statusId: number,
) => {
  return companyDB.companies.update(companyId, { statusId });
};

export const clearCompanies = async () => {
  return companyDB.companies.clear();
};
