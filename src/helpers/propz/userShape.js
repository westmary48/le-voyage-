import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default userShape;
