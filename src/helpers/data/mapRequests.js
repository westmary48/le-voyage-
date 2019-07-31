import { EsriProvider } from 'leaflet-geosearch';

const provider = new EsriProvider();

const getLatAndLong = city => new Promise((resolve, reject) => {
  provider.search({ query: city })
    .then((results) => {
      const coordinates = results[0];
      resolve(coordinates);
    })
    .catch(err => reject(err));
});

export default {
  getLatAndLong,
};
