import PropTypes from 'prop-types';

const friendsShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  friendUid: PropTypes.string.isRequired,
  isAccepted: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
});

export default friendsShape;
