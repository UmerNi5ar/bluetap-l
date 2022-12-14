import React from 'react';
import PropTypes from 'prop-types';

import {
  IssuePriority,
  IssuePriorityCopy,
} from '../../../shared/constants/issues';

import { EpicPriorityCopy } from '../../../shared/constants/epics';
import toast from '../../../shared/utils/toast';
import useApi from '../../../shared/hooks/api';
import { Form, IssuePriorityIcon } from '../../../shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Actions,
  ActionButton,
} from './Styles';
import { connect } from 'react-redux';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectEpicCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  const [{ isCreating }, createEpic] = useApi.post(`/epic/${project._id}`);

  return (
    <Form
      enableReinitialize
      initialValues={{
        epicTitle: '',
        description: '',
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        epicTitle: [Form.is.required(), Form.is.maxLength(200)],
        priority: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createEpic({
            description: values.description,
            title: values.epicTitle,
            key: `${project.key}-${project.totalEpics + 1}`,
            projectId: project._id,
            priority: values.priority,
            creationDate: Date.now(),
          });
          await fetchProject();
          toast.success('Epic has been successfully created.');
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Category</FormHeading>
        <Form.Field.Input
          name="epicTitle"
          label="Category"
          tip="Name of the category you want to add."
        />

        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Add
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const priorityOptions = Object.values(IssuePriority).map((priority) => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{EpicPriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

ProjectEpicCreate.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.projectState.project,
});

export default connect(mapStateToProps)(ProjectEpicCreate);
