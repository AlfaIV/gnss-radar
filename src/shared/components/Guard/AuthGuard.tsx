import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "~/entities/store/UserStore/useUserStore";
import { HOCProps } from "~/shared/typings/common/common";
import { UserType } from "~/shared/typings/user/userTypings";


const AuthGuard = memo((props: HOCProps) => {

    const { children } = props;

    const navigate = useNavigate();

    const [id, clear] = useUserStore((state: UserType) => [state.id, state.clearUser])

    useEffect(() => {
        if(!id) {
            navigate('/login')
            clear()
        }
    })


    return (<>{children}</>)
})

export default AuthGuard