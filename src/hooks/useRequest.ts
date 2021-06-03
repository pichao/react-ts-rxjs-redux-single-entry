import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import axios from 'axios';
export const useRequest = (params, callback = (data) => {}) => {
    const [rParams, setRparams] = useState({
        ...params,
    });
    const [isFetching, setIsFetching] = useState(true);
    const [res, setRes] = useState(null);
    const getData = useCallback(async () => {
        try {
            const data = await axios({
                ...rParams,
            });
            console.log(data, 'kkkkkkkkkkkk');
            setRes({
                status: data.status,
                data: data.data,
            });
            callback({
                status: data.status,
                data: data.data,
            });
        } catch (error) {
            console.log(error.response, error.request, 'cuo');
            if (error.response) {
                callback({
                    status: error.response.status,
                    data: null,
                });
                setRes({
                    status: error.response.status,
                    data: null,
                });
            }
        }
        setIsFetching(false);
    }, [rParams]);

    useEffect(() => {
        getData();
    }, [rParams]);
    return [isFetching, res];
};
