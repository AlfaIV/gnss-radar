import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "~/entities/store/UserStore/useUserStore";
import { UserType } from "~/shared/typings/user/userTypings";

const AuthGuard = memo(() => {
  const navigate = useNavigate();
  const id = useUserStore((state: UserType) => state.id);

  useEffect(() => {
    if (!id) {
      navigate("/login", { replace: true });
    }
  }, [id, navigate]);

  if (!id) {
    return null;
  }

  return <><Outlet /></>;
});

export default AuthGuard;