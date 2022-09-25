import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../shared/utils/api';
import useCurrentUser from '../../../../../shared/hooks/currentUser';
import toast from '../../../../../shared/utils/toast';

import BodyForm from '../BodyForm';
import ProTip from './ProTip';
import { Create, UserAvatar, Right, FakeTextarea } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsCreate = ({
  issueId,
  fetchIssue,
  role,
  type,
  review,
  setReview,
  ratings,
  setRatings,
  reviewBody,
  setReviewBody,
}) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');

  const { currentUser } = useCurrentUser();
  const handleCommentCreate = async () => {
    try {
      setCreating(true);

      await api.post(`/comment`, {
        body,
        issueId,
        userId: currentUser.id,
        user: currentUser.id,
      });
      await fetchIssue();
      setFormOpen(false);
      setCreating(false);
      setBody('');
    } catch (error) {
      toast.error(error);
    }
  };
  const handleReviewCreate = async () => {
    try {
      console.log('not runninfg');
      setCreating(true);
      setReview(reviewBody);
      console.log(reviewBody);
      // await api.post(`/createReview`, {
      //   ...review,
      //   ratings,
      // });
      // await fetchIssue();
      // setFormOpen(false);
      setCreating(false);
      // setReview('');
    } catch (error) {
      toast.error(error);
    }
  };
  if (type === 'review') {
    return (
      <Create>
        {currentUser && (
          <UserAvatar
            name={currentUser.name}
            avatarUrl={currentUser.avatarUrl}
          />
        )}
        <Right>
          {isFormOpen ? (
            <BodyForm
              role={role}
              value={reviewBody}
              onChange={setReviewBody}
              isWorking={isCreating}
              onSubmit={
                type === 'review' ? handleReviewCreate : handleCommentCreate
              }
              onCancel={() => setFormOpen(false)}
            />
          ) : (
            <Fragment>
              <FakeTextarea onClick={() => setFormOpen(true)}>
                Add a comment...
              </FakeTextarea>
              <ProTip setFormOpen={setFormOpen} />
            </Fragment>
          )}
        </Right>
      </Create>
    );
  }

  return (
    <Create>
      {currentUser && (
        <UserAvatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} />
      )}
      <Right>
        {isFormOpen ? (
          <BodyForm
            role={role}
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={
              type === 'review' ? handleReviewCreate : handleCommentCreate
            }
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <FakeTextarea onClick={() => setFormOpen(true)}>
              Add a comment...
            </FakeTextarea>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </Right>
    </Create>
  );
};

ProjectBoardIssueDetailsCommentsCreate.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreate;
