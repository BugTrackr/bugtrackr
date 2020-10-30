import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';

const AddBug = () => {
  let validate = (value) => {
    let error;
    if (!value) error = 'required field';
    return error;
  };

  return (
    <Formik
      initialValues={{
        projectId: '',
        description: '',
        userId: '',
        assigned_to: '',
        status: '',
      }}
      onSubmit={(values, actions) => {
        fetch('/bugs/create', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="project_Id"
            placeholder="projectId"
            validate={validate}
          />
          {errors.projectId && touched.projectId && (
            <div>{errors.projectId}</div>
          )}
          <Field
            name="description"
            placeholder="Description"
            validate={validate}
          />
          {errors.description && touched.description && (
            <div>{errors.description}</div>
          )}

          <Field name="userId" placeholder="userId" validate={validate} />
          {errors.userId && touched.userId && <div>{errors.userId}</div>}

          <Field name="assigned_to" validate={validate} as="select">
            <option value="">Select a User</option>
            <option value="1">User1</option>
            <option value="1">User2</option>
            <option value="999">User3</option>
          </Field>
          {errors.assigned_to && touched.assigned_to && (
            <div>{errors.assigned_to}</div>
          )}

          <Field name="status" validate={validate} as="select">
            <option value="">Select a Status</option>
            <option value="3">Open</option>
          </Field>
          {errors.status && touched.status && <div>{errors.status}</div>}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBug;
