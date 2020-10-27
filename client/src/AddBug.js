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
        project: '',
        description: '',
        author: '',
        assigned: '',
        status: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="project" placeholder="project" validate={validate} />
          {errors.project && touched.project && <div>{errors.project}</div>}
          <Field
            name="description"
            placeholder="Description"
            validate={validate}
          />
          {errors.description && touched.description && (
            <div>{errors.description}</div>
          )}

          <Field name="author" placeholder="Author" validate={validate} />
          {errors.author && touched.author && <div>{errors.author}</div>}

          <Field name="assigned" validate={validate} as="select">
            <option value="">Select a User</option>
            <option value="user1">User1</option>
            <option value="user2">User2</option>
            <option value="user3">User3</option>
          </Field>
          {errors.assigned && touched.assigned && <div>{errors.assigned}</div>}

          <Field name="status" validate={validate} as="select">
            <option value="">Select a Status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </Field>
          {errors.status && touched.status && <div>{errors.status}</div>}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBug;
