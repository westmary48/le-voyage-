import PropTypes from 'prop-types';

const upcomingCardShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { upcomingCardShape };
