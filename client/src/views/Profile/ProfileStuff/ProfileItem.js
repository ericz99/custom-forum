import React, { Fragment } from "react";

import ProfileFeed from "./ProfileFeed";

export default function ProfileItem({ profile }) {
  return (
    <Fragment>
      <ProfileFeed profile={profile} />
    </Fragment>
  );
}
