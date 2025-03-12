// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

import isMac from './util/is-mac';
if (isMac()) {
  import('./assets/mac-style.scss')
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faCarBus } from '@fortawesome/pro-solid-svg-icons/faCarBus';

library.add(farAngleDown, farAngleUp, farTimes, farPlus, farMinus, faCheck, faCarBus);

// use these if running off unlinked package
import pinboard from '@phila/pinboard';
import '../node_modules/@phila/pinboard/dist/style.css';
// OR
// use this if running off linked package
// import pinboard from '../node_modules/@phila/pinboard/src/main.js';

// data-sources
import wifi from './data-sources/wifi';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = markRaw({
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
});

import legendControl from './general/legendControl';


import i18n from './i18n/i18n';
console.log('main.js i18n:', i18n);

let $config = {
  i18n: i18n.i18n,
  // i18n: {
  //   data: {
  //     messages: {
  //       'en-US': {}
  //     }
  //   }
  // },
  publicPath: import.meta.env.VITE_PUBLICPATH,
  app: {
    type: 'wifi',
    title: 'Find Free Wifi in Philadelphia',
  },
  gtag: {
    category: 'rf-wifi',
  },
  fieldsUsed: {
    section: 'PROGRAM_TYPE',
  },
  agoTokenNeeded: true,
  allowZipcodeSearch: true,
  allowPrint: true,
  showBuffers: true,
  resetDataOnGeocode: true,
  retractableRefine: false,
  dropdownRefine: false,
  searchBar: {
    searchTypes: [
      'address',
      'zipcode',
      'keyword',
    ],
    searchDistance: 3,
    fuseThreshold: 0.4,
  },
  tags: {
    type: 'fieldValues',
    tags: [
      {
        type: 'value',
        field: 'name',
      },
    ],
  },
  locationInfo: {
    siteNameField: 'SITE_NAME',
    siteName: function(item) {
      return item.properties.SITE_NAME;
    },
  },
  customComps,
  // hiddenRefine: {
  //   START_DATE: function(item) {
  //     // let today = format(new Date(), 'MM/dd/yyyy');
  //     let today = Date.parse(new Date());
  //     let test = parse('January');
  //     console.log('today:', today, 'item.properties.START_DATE:', item.properties.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''), 'item.properties.END_DATE:', item.properties.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //     let startDate, endDate;
  //     if (typeof item.properties.START_DATE === 'string') {
  //       startDate = Date.parse(item.properties.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //       // startDate = format(parseISO(item.properties.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', '')), 'MM/dd/yyyy');
  //     } else {
  //       startDate = format(item.properties.START_DATE, 'MM/dd/yyyy');
  //     }
  //
  //     if (typeof item.properties.END_DATE === 'string') {
  //       endDate = Date.parse(item.properties.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //       // endDate = format(parseISO(item.properties.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', '')), 'MM/dd/yyyy');
  //     } else {
  //       endDate = format(item.properties.END_DATE, 'MM/dd/yyyy');
  //     }
  //
  //     console.log('today:', today, 'startDate:', startDate, 'endDate:', endDate);
  //
  //     return true;
  //   },
  // },
  refine: {
    type: 'multipleFields',
    // columns: true,
    multipleFields: {
      'Computers to Display': function(item) { return item.properties.AVAILABLE_COMPUTERS_TO_DISPLAY_Y_N === 'Y'; },
      // 'Computers for Afterschool Camp': function(item) { return item.properties.COMPUTERS_AFTERSCHOOL_CAMP_Y_N === 'Y'; },
      'Computers for Public Access': function(item) { return item.properties.COMPUTERS_PUBLIC_ACCESS_Y_N === 'Y'; },
    },
  },
  legendControl,
  dataSources: {
    wifi,
  },
  router: {
    enabled: false,
  },
  sections: {
    PPR_REC:{
      title: 'PPR Recreation Centers',
      titleSingular: 'PPR Recreation Center',
      color: '#0F4D90',
    },
    PPR_OPERATIONS:{
      title: 'PPR Operations',
      titleSingular: 'PPR Operation',
      color: '#721817',
    },
    ENVIRONMENTAL_EDUCATION_CENTER:{
      title: 'Environmental Education Centers',
      titleSingular: 'Environmental Education Center',
      color: '#a86518',
    },
    OLDER_ADULT_CENTER: {
      title: 'Older Adult Centers',
      titleSingular: 'Older Adult Center',
      color: '#444444',
    },
    MUSEUM:{
      title: 'Museums',
      titleSingular: 'Museum',
      color: '#B569C3',
    },
    LIBRARY:{
      title: 'Libraries',
      titleSingular: 'Library',
      color: '#506D0A',
    },
    OTHER:{
      title: 'Other PPR Locations',
      titleSingular: 'Other PPR Location',
      color: '#BAAC2C',
    },
  },
  projection: '3857',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  holidays: {},
  mapLayer: {
    id: 'resources',
    source: 'resources',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': [
        'match',
        ['get', 'PROGRAM_TYPE'],
        'PPR_REC',
        '#0F4D90',
        'PPR_OPERATIONS',
        '#721817',
        'ENVIRONMENTAL_EDUCATION_CENTER',
        '#506D0A',
        'OLDER_ADULT_CENTER',
        '#444444',
        'MUSEUM',
        '#B569C3',
        'LIBRARY',
        '#a86518',
        'OTHER',
        '#BAAC2C',
        /* other */ '#000000'
      ],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
    },
  },
  // mapLayer: {
  //   id: 'resources',
  //   source: 'resources',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 7,
  //     'circle-color': '#2176d2',
  //     'circle-stroke-width': 1,
  //     'circle-stroke-color': 'white',
  //   },
  // },
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "app.cityOfPhiladelphia",
    },
    {
      type: "native",
      href: "https://www.phila.gov/wifi-finder/",
      text: "app.about",
    },
    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "app.feedback",
    },
  ],
};

pinboard($config);
export default $config;