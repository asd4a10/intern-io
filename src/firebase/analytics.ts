import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../configs/firebase.ts";

const analytics = getAnalytics(app);
logEvent(analytics, "app started");

export const addLog = (msg: string) => {
  logEvent(analytics, msg);
};
