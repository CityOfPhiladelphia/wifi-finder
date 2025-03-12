export default {
  id: 'wifi',
  type: 'http-get',
  dependent: 'agoToken',
  resettable: false,
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/fiber_sites_census_data_250224/FeatureServer/0/query',
  options: {
    params: {
      where: '1=1',
      outFields: '*',
      f: 'geojson',
    },
    success: function(data, dependent) {
      data.features = data.features.filter(function(feature) {
        return feature.geometry && feature.properties && feature.properties.PUBLIC_WIFI_AVAILABLE === 'Y';
      });

    },
  },
};
