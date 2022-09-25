import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../../shared/utils/api';
import useApi from '../../../shared/hooks/api';
import { PageError, Button } from '../../../shared/components';
import toast from '../../../shared/utils/toast';
// import Comment from './Comment';

import Loader from './Loader';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';
import Create from './Comments/Create';
import {
  TopActions,
  TopActionsRight,
  Content,
  Left,
  Right,
  Image,
  ReviewContainer,
  Reviewed,
  RatingsContainer,
} from './Styles';
import { connect } from 'react-redux';
import Ratings from '../Ratings';
import axios from 'axios';
import { Divider } from '../../../shared/components/Breadcrumbs/Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  modalClose,
  page,
  user,
  projectLead,
}) => {
  const [ratings, setRatings] = useState();
  const [review, setReview] = useState();
  const [body, setBody] = useState('');
  const [{ data, error }, fetchIssue] = useApi.get(`/issue/${issueId}`);
  if (!data) return <Loader />;
  if (error) return <PageError />;

  const issue = data;

  const updateIssue = async (updatedFields) => {
    await api.optimisticUpdate(`/issue/${issueId}`, updatedFields);
    await fetchIssue();
    await fetchProject();
  };
  const createReview = async () => {
    if (!ratings || !review || !body) {
      toast.error('No review provided!');
      return;
    }
    console.log(ratings, review);
    const sData = {
      issueId,
      body: review,
      rating: ratings,
    };
    await axios.post(`/v1//issue/createReview`, sData);
    await fetchIssue();
    await fetchProject();
  };

  return (
    <Fragment>
      <TopActions>
        <TopActionsRight>
          {(user.role === 'owner' || user.id === projectLead.id) && (
            <Delete
              issue={issue}
              fetchProject={fetchProject}
              modalClose={modalClose}
            />
          )}

          <Button
            icon="close"
            iconSize={24}
            variant="empty"
            onClick={modalClose}
          />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <a href={`/files/${issue.file}`} target="_blank" rel="noreferrer">
            <Image
              src={`/files/${issue.file}`}
              alt="some pic"
              issue={issue}
              updateIssue={updateIssue}
            />
          </a>
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments role={user.role} issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} page={page} />
          <AssigneesReporter
            issue={issue}
            updateIssue={updateIssue}
            projectUsers={projectUsers}
          />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
          <Divider />
          {!issue.review ? (
            user.role === 'owner' ? (
              <ReviewContainer>
                <span>Review: </span>
                <RatingsContainer>
                  <Ratings size={30} half={true} setRatings={setRatings} />
                </RatingsContainer>
                <Create
                  type="review"
                  issueId={issue.id}
                  reviewBody={body}
                  setReviewBody={setBody}
                  setReview={setReview}
                  setRatings={setRatings}
                  ratings={ratings}
                  review={review}
                  fetchIssue={fetchIssue}
                />

                <Button onClick={createReview}>Submit</Button>
              </ReviewContainer>
            ) : (
              <span>Not Rated Yet!</span>
            )
          ) : (
            <Reviewed>
              <div>
                <spna style={{ color: '#0b875b' }}>Review: </spna>{' '}
                {issue.review.body}
              </div>
              <div>
                <span style={{ color: '#0b875b' }}>Rating: </span>{' '}
                {issue.review.rating}/5
              </div>
            </Reviewed>
          )}
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.userState.user,
  projectLead: state.projectState.project.projectLead,
});

export default connect(mapStateToProps)(ProjectBoardIssueDetails);
