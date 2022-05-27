import axios from "axios";
import {showMessage} from "@/utils";

const ins = axios.create();
ins.interceptors.response.use(function(res) {
  if(res.data.code !== 0) {
    showMessage({
      content: res.data.msg,
      type:error,
      duration: 1500
    })
    return null
  }
  return res.data.data
})
export default ins