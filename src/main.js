// import scrollbar style for macs
import isMac from './util/is-mac';
if (isMac()) {
  import('./assets/mac-style.scss')
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faCarBus } from '@fortawesome/pro-solid-svg-icons/faCarBus';

library.add(faExclamationTriangle, farAngleDown, farAngleUp, farTimes, farPlus, farMinus, faCheck, faCarBus);

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
import customRouterLink from './components/CustomRouterLink.vue';
const customComps = markRaw({
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
  'customRouterLink': customRouterLink,
});

import legendControl from './general/legendControl';

import i18n from './i18n/i18n';
if (import.meta.env.VITE_DEBUG) console.log('main.js i18n:', i18n);

let $config = {
  i18n: i18n.i18n,
  publicPath: import.meta.env.VITE_PUBLICPATH,
  app: {
    type: 'wifi',
    subtitle: 'i18n',
  },
  gtag: {
    category: 'rf-wifi',
  },
  fieldsUsed: {
    section: 'program_type_to_display',
    subsection: 'program_type_to_display',
  },
  refineEnabled: false,
  // agoTokenNeeded: false,
  allowZipcodeSearch: true,
  allowPrint: true,
  retractableRefine: false,
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
        field: 'site_name',
      },
    ],
  },
  locationInfo: {
    siteNameField: 'site_name',
    siteName: function(item) {
      return item.properties.site_name;
    },
  },
  customComps,
  refine: {
    type: 'multipleFieldGroups',
    columns: true,
    multipleFieldGroups: {
      categoryType: {
        checkbox: {
          'PPRREC': {
            unique_key: 'categoryType_PPRREC',
            i18n_key: 'categoryType.PPRREC',
            value: function(item) {
              return item.properties.program_type === 'PPR_REC';
            },
          },
          'OLDERADULTCENTER': {
            unique_key: 'categoryType_OLDERADULTCENTER',
            i18n_key: 'categoryType.OLDERADULTCENTER',
            value: function(item) {
              return item.properties.program_type === 'OLDER_ADULT_CENTER';
            },
          },
          'LIBRARY': {
            unique_key: 'categoryType_LIBRARY',
            i18n_key: 'categoryType.LIBRARY',
            value: function(item) {
              return item.properties.program_type === 'LIBRARY';
            },
          },
          'OTHER': {
            unique_key: 'categoryType_OTHER',
            i18n_key: 'categoryType.OTHER',
            value: function(item) {
              return item.properties.program_type === 'OTHER';
            },
          },
        },
        columns: 4,
      },
      internetServices: {
        checkbox: {
          'verizon': {
            unique_key: 'internetServices_verizon',
            i18n_key: 'internetServices.verizon',
            value: function(item) {
              return item.properties.verizon_inet_fiber === 'Y';
            },
          },
        },
        columns: 1,
      },
      computerServices: {
        checkbox: {
          'computersPublicAccess': {
            unique_key: 'computerServices_computersPublicAccess',
            i18n_key: 'computerServices.computersPublicAccess',
            value: function(item) {
              return item.properties.available_computers_to_display === 'Y';
            },
          },
        },
        columns: 2,
      },
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
    'PPR Recreation Centers':{
      title: 'PPRREC',
      titleSingular: 'PPRREC',
      color: '#506D0A',
    },
    'Older Adult Centers': {
      title: 'OLDERADULTCENTER',
      titleSingular: 'OLDERADULTCENTER',
      color: '#721817',
    },
    'Libraries':{
      title: 'LIBRARY',
      titleSingular: 'LIBRARY',
      color: '#0F4D90',
    },
    'Other PPR Sites':{
      title: 'OTHER',
      titleSingular: 'OTHER',
      color: '#B569C3',
    },
  },
  subsections: {
    'PPR Recreation Centers': 'PPR Recreation Centers',
    'Older Adult Centers': 'Older Adult Centers',
    'Libraries': 'Libraries',
    'Other PPR Sites (I.e Museum, Education Centers, etc.)': 'Other PPR Sites',
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
  holidays: {
    forceBanner: true,
    forceBannerMessage: 'statusPage',
  },
  mapLayer: {
    id: 'resources',
    source: 'resources',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': [
        'match',
        ['get', 'program_type_to_display'],
        'PPR Recreation Centers',
        '#506D0A',
        'Older Adult Centers',
        '#721817',
        'Libraries',
        '#0F4D90',
        'Other PPR Sites (I.e Museum, Education Centers, etc.)',
        '#B569C3',
        /* other */ '#000000'
      ],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
    },
  },
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
      href: ".",
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