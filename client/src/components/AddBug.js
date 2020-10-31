import React, { useEffect } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { createBug, getAllProjects } from '../reducers/bug';

const AddBug = () => {
  console.log('bug added');
  let validate = (value) => {
    let error;
    if (!value) error = 'required field';
    return error;
  };

  let listOfProjects = useSelector((state) => state.bugs.projectList);

  const dispatch = useDispatch();
  const onLoad = () => {
    dispatch(getAllProjects());
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="container font-sans text-lg text-gray-800 max-w-md">
      <div className="">
        <Formik
          initialValues={{
            projectId: '',
            description: '',
            userId: '',
            assigned_to: '',
            status: '',
          }}
          onSubmit={(values) => {
            dispatch(createBug(values));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 gap-2 shadow-lg p-3 rounded-md">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="project_Id"
                >
                  Project ID
                </label>
                <Field
                  name="project_Id"
                  placeholder="project Id"
                  validate={validate}
                  as="select"
                  className="shadow appearance-none border rounded w-full bg-gray-200 py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Project</option>
                  {listOfProjects.map((value) => (
                    <option key={'project' + value.id} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Field>
                {errors.projectId && touched.projectId && (
                  <div>{errors.projectId}</div>
                )}

                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  name="description"
                  placeholder="Description"
                  validate={validate}
                  as="textarea"
                  className="shadow appearance-none border rounded w-full bg-gray-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.description && touched.description && (
                  <div>{errors.description}</div>
                )}
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="userId"
                >
                  User Id
                </label>
                <Field
                  name="userId"
                  placeholder="userId"
                  validate={validate}
                  className="shadow appearance-none border rounded w-full bg-gray-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.userId && touched.userId && <div>{errors.userId}</div>}

                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="assigned_to"
                >
                  Assigned To
                </label>
                <Field
                  name="assigned_to"
                  validate={validate}
                  as="select"
                  className="shadow appearance-none border rounded w-full bg-gray-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a User</option>

                  {listOfProjects.map(
                    (value) =>
                      `<option
                          key= "owner${+value.owner}"
                          value=${value.owner}>
                          ${value.owner}
                        </option>`
                  )}
                </Field>

                {/* <option
                          key={'owner-' + value.owner}
                          value={value.owner}
                        >
                          {value.owner}
                        </option> */}
                {errors.assigned_to && touched.assigned_to && (
                  <div>{errors.assigned_to}</div>
                )}
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="status"
                >
                  Status
                </label>
                <Field
                  name="status"
                  validate={validate}
                  as="select"
                  className="shadow appearance-none border rounded w-full bg-gray-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 mb-2"
                >
                  <option value="">Select a Status</option>
                  <option value="3">Open</option>
                </Field>
                {errors.status && touched.status && <div>{errors.status}</div>}

                <button
                  type="submit"
                  className="block w-1/4 mx-auto bg-indigo-500 rounded-sm p-2 shadow-lg text-white transform hover:scale-105 transition duration-300 ease-in"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBug;
