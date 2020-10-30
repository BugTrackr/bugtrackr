import React, { useEffect, useState } from 'react';
import BugListItem from './BugListItem';

import { connect, getState, dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../stores/index';
import { addBug, setBugs } from '../actions/bugs';

const BugList = (props) => {
  const handleItemClick = (id) => {
    console.log('CLICKED');
    history.push(`/bugs/${id}`);
  };
  const [bugList, setBugList] = useState([]);

  let fetchBugsList = () => {
    console.log('hi from fetchBugsList');

    return (dispatch, getState) => {
      console.log('hi from Thunk');

      return fetch(`/users/getAssignedBugs/1`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);

          //set data instore

          //  setBugList(data);
          console.log('state', store.getState());
          //dispatch(SET_BUGS(data));
          return data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  };

  useEffect(() => {
    fetchBugsList();
  }, []);

  return (
    <div>
      <hr />
      <h2>BugList</h2>
      <ul>
        {bugList ? (
          bugList.map((item) => (
            <BugListItem
              {...item}
              key={`${item.id}`}
              onClick={() => handleItemClick(item.id)}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </div>
  );
};

//export default BugList;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBugs,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(BugList);
