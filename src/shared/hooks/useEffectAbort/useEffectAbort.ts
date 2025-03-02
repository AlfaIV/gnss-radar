import { useEffect } from "react";

const useEffectAbort = (callback: Function, deps: Array<any>) => {
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        callback(signal);

        return () => controller.abort();
    }, [...deps])
}

export default useEffectAbort;