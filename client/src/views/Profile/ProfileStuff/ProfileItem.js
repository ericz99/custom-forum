import React, { Fragment } from "react";

import ProfileFeed from "./ProfileFeed";

export default function ProfileItem({ profile, value }) {
  return (
    <Fragment>
      <ProfileFeed profile={profile} value={value} />
    </Fragment>
  );
}
