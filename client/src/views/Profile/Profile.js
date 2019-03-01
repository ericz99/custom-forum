import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewProfile } from "../../actions/profileActions";

import ProfileItem from "./ProfileStuff/ProfileItem";
import Select from "../../components/common/Select";

class Profile extends Component {
  state = {
    selection: {}
  };

  async componentDidMount() {
    await this.props.viewProfile();
  }

  render() {
    const { profile, isLoading } = this.props.profile;

    let profileContent;

    if (isLoading || profile === null) {
      profileContent = <h1>Loading...</h1>;
    }

    if (profile !== null && profile.post) {
      profileContent =
        profile.post.length === 0 ? (
          <h1>No post available!</h1>
        ) : (
          <ProfileItem profile={profile} />
        );
    }

    return (
      <div className="container">
        <div className="main-content">
          <div className="left">{profileContent}</div>
          <div className="right">
            <div className="user--options">
              {profile.user && (
                <Fragment>
                  <p>USER: {profile.user.name}</p>
                  <p>Joined at: {profile.user.date}</p>
                </Fragment>
              )}
              <div className="btnGroup">
                <Link to="/submit">new post</Link>
              </div>
            </div>
            <div className="user--navigation">
              <Fragment>
                <p>Filtering</p>
              </Fragment>
              <Select value="Posts" name="Post" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  viewProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { viewProfile }
)(Profile);
