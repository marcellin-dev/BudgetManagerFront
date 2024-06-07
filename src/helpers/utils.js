import {LS} from "./security";
import axios from "axios";
import { toast } from "react-toastify";

export function notification(type, message) {
    return toast(
        <div>
            <span className="text-center">{message}</span> <br />
        </div>,
        {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: type,
        }
    );
}

export function ApiCall(
    route,
    met,
    bodyParam,
    queryParam,
    header
) {
    const baseUrl = "https://x8ki-letl-twmt.n7.xano.io/api:GeJpzLx8/";
    let headers = {};

    axios.defaults.headers.common.Authorization = `Bearer ${
        LS.get("token")
    }`;
    if (header) headers = Object.assign(headers, header);
    let config = {};

    console.log(" ====+> ", LS.get("user"));
    config = {
        url: baseUrl + route,
        method: met,
        headers: headers,
    };

    if (queryParam != null) config.params = queryParam;
    if (bodyParam != null) config.data = bodyParam;

    console.log("detail for request =================> ", config);
    return axios
        .request(config)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            if(err.response?.status === 401){
                LS.remove("token");
                window.location.href = "/login";
            }
            return err;
        });
}
