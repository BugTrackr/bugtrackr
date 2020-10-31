import React, { useEffect } from 'react';
import BugListItem from './BugListItem';
import { useSelector, useDispatch } from 'react-redux';
//import { bindActionCreators } from 'redux';

import { loadBugsList } from '../reducers/bug';

const BugsList = ({ history }) => {
  const handleItemClick = (id) => {
    console.log('CLICKED');
    history.push(`/bugs/${id}`);
  };

  const bugs = useSelector((state) => state.bugs);
  const dispatch = useDispatch();
  const onLoad = () => {
    dispatch(loadBugsList());
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <hr />
      <h2>Your Assigned Bugs</h2>
      <ul>
        <li className="flex gap-2">
          <div className="flex-1 text-gray-700 uppercase m-2">project_id</div>

          <div className="flex-1 text-gray-700  uppercase m-2">description</div>
          <div className="flex-1 text-gray-700  uppercase m-2">status</div>
        </li>
        {bugs.bugList ? (
          bugs.bugList.map((item) => (
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

export default BugsList;

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setBugs,
//     },
//     dispatch
//   );

// export default connect(null, mapDispatchToProps)(BugList);
