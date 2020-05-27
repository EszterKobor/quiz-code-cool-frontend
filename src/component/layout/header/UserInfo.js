import React, { useContext, useEffect } from "react";
import { UserContext } from "context/UserContext";
import user from "style/img/user.png";

import {
    ToolbarNavigationUl,
    UserImage,
  } from "component/layout/header/styles";
import { FormattedNavLink } from "style/js/CommonStyles";

export default function UserInfo() {
    const { usernameState, userIdState, isExpired } = useContext(UserContext);
    const username = usernameState[0];
    const userId = userIdState[0]

    useEffect(() => {
      if (username != null)
        isExpired();
    }, [])

    return (
        username ? (
            <div>
              <ToolbarNavigationUl>
                <li>
                  <UserImage src={user}></UserImage>
                  <FormattedNavLink to={`/users/${userId}`}>{username}</FormattedNavLink>
                </li>
              </ToolbarNavigationUl>
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )
    )
}
