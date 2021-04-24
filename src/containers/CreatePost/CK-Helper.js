//ignore

import { BASE_URL } from "../../constant";
import { checkToken } from "../../services/user.service";

const headerCK = {
  "X-CSRF-TOKEN": "CSRF-Token",
  Authorization: checkToken() ? "Bearer " + checkToken() : null,
};

export const CKConfig = {
  uploadUrl: `${BASE_URL}/api/v1/user/files/ck/images`,
  withCredentials: true,
  headers: headerCK,
};
