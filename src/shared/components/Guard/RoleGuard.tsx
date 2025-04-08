import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "~/entities/store/UserStore/useUserStore";
import { HOCProps } from "~/shared/typings/common/common";
import { RoleGuardProps } from "~/shared/typings/Layout/layout";
import { UserType } from "~/shared/typings/user/userTypings";


const RoleGuard = memo((props: HOCProps & RoleGuardProps) => {

    const { children, role='USER' } = props;

    const navigate = useNavigate();

    const [id, userRole] = useUserStore((state: UserType) => [state.id, state.role])

    useEffect(() => {
        if(!id || userRole !== role) {
            navigate('/state')
        }
    })


    return (<>{children}</>)
})

export default RoleGuard