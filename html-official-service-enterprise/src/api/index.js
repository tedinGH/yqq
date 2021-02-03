import { serves } from "@/api/serves";
import * as urls from "./urls";

export const actionApi = {
  login(data) {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.LOGIN,
        data: data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
  logout() {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.LOGOUT
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
};
