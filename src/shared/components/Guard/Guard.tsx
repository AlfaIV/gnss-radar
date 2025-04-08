import { memo } from "react";
import { HOCProps } from "~/shared/typings/common/common";
import { RoleGuardProps } from "~/shared/typings/Layout/layout";
import AuthGuard from "./AuthGuard";
import RoleGuard from "./RoleGuard";


const Guard = memo((props: HOCProps & RoleGuardProps) => {

    const { children, role='USER' } = props;

    return (<AuthGuard>
        <RoleGuard role={role}>
        {children}
        </RoleGuard>
    </AuthGuard>)
})

export default Guard