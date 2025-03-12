export default {
  id: 'wifi',
  type: 'http-get',
  dependent: 'agoToken',
  resettable: false,
  // bearer: true,
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/fiber_sites_census_data_250224/FeatureServer/0/query',
  options: {
    params: {
      where: '1=1',
      outFields: '*',
      f: 'geojson',
    },
    // success: function(data, dependent) {
    //   if (import.meta.env.VITE_DEBUG) console.log('wifi data:', data);
      // data.features = [];
      // data.records.forEach(function(record) {
      //   if (record.fields.X && record.fields.Y) {
      //     record.geometry = {
      //       type: 'Point',
      //       coordinates: [record.fields.X, record.fields.Y],
      //     };
      //     record.properties = record.fields
      //     record.type = 'Feature';
      //     data.features.push(record);
      //   }
      // });
      // data.features = data.records;
    // }
  },
};
