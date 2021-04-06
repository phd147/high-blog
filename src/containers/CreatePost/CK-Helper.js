//ignore

import { checkToken } from "../../services/user.service";

const headerCK = {
  "X-CSRF-TOKEN": "CSRF-Token",
  Authorization: checkToken() ? "Bearer " + checkToken() : null,
};

export const CKConfig = {
  uploadUrl: "http://35.240.173.198/api/v1/user/files/ck/images",
  withCredentials: true,
  headers: headerCK,
};
