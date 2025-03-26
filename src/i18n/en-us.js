export default {
  language: 'English',
  app: {
    title: "City Wi-Fi Finder",
    subtitle: "Free Wi-Fi and computer services in Philadelphia",
    noResults: "We're sorry, there are no results for that search. Adjust the filters you've selected and try again.",
    // searchPlaceholders: {
    //   all: 'Search by address or market name',
    // },
  },
  checkSite: 'Before you go, contact the site to confirm their hours and what they offer.',
  service: "Service",
  statusPage: "See the <a href='?services=internetServices_verizon'>total number of sites activated since October 2024</a> as part of the City's Verizon Franchise Agreement",
  introPage: {
    section1Title: "Find free City Wi-Fi",
    p0: "The City offers free Wi-Fi at many recreation centers, older adult centers, parks, and libraries. Over 180 locations are part of a <a href='https://www.phila.gov/2024-07-01-mayor-cherelle-l-parker-announces-franchise-renewal-agreement-with-verizon-cable-service/' target='_blank'>franchise agreement between the City and Verizon</a> to install high-speed broadband and public Wi-Fi for residents over two years.",
    // p0: "The City offers free Wi-Fi at many recreation centers, older adult centers, parks, and libraries. Over 180 locations are part of an agreement between the City and Verizon to install high-speed broadband and public Wi-Fi for residents over two years. See the <a aria-current='page' href='?services=internetServices_verizon'>total number of Verizon INET sites activated</a> since October 2024.",
    // p1: "See the <a href='#' target='_blank'>total number of Verizon INET sites activated</a> since October 2024.",
    p2: "To find a free Wi-Fi location:",
    ul1: {
      li: "Filter by the services you need.",
      li2: "Select the location on the map for details.",
      li3: "Search an address or ZIP code to find locations near you.",
    },
    section2Title: "Computer services",
    // ul2: {
    //   li1: `Call or email the location directly to confirm hours, availability and type of programs it offers.`,
    //   li2: "Learn more about how the City is increasing <a href='https://communityresourceconnects.org/city-of-philadelphia-office-of-adult-education-%2528oae%2529--philadelphia-pa--keyspot/5539030524231680' target='_blank'>free wifi in Philadelphia</a>.",
    // },
    p3: "Some locations have computers available for public use. Computers may only be available for specific programs or at specific times.",
    // p3: "Many of these locations also offer access to computers for residents. Some locations offer regular hours where any resident can use a computer during open access hours. Other locations offer digital skills workshops and classes at scheduled times to help residents learn how to navigate the web or use a computer. Some locations only offer computer access to specific programs run by those locations, such as for afterschool students, at this time. Contact the site directly for information about what each site offers.",
    section3Title: "Disclaimer",
    p4: "Wi-Fi access at all locations is limited to legal uses and may have some restrictions. You must consent to a policy statement to log on to use Free Library of Philadelphia’s Wi-Fi or the City Wi-Fi at Parks and Recreation locations.",
    // p4: "We collect some information about you and your devices for the purpose of optimizing the Wi-Fi network functionality. By using the City of Philadelphia's Free Wi-Fi, you consent to the practices described in this privacy policy. If, for any reason, you do not consent to these practices, please do not use the City's Free Wi-Fi services. For more details about our Privacy Policy, feel free to reach out to us.",
    // section4Title: "Terms & Conditions",
    // p5: "The Service is a free public service provided by the City of Philadelphia. Your access to the Service is completely at the discretion of the City, and your access to the Service may be terminated at any time for any reason. You must accept this Agreement each time you use the Service and it is your responsibility to review it for any changes each time. This is an open wireless network.",
  },
  categoryType: {
    category: 'Location type',
    'PPRREC': 'Recreation center',
    'PPR Recreation Center': 'Recreation center',
    'OLDERADULTCENTER': 'Older adult center',
    'LIBRARY': 'Library',
    'OTHER': 'Other site',
  },
  services: {
    category: 'Services',
    verizon: 'Verizon franchise agreement location',
    wifi: 'Public Wi-Fi available',
    computersPublicAccess: 'Computers available',
  },
  internetServices: {
    category: 'Internet services',
    verizon: 'Verizon franchise agreement location',
    meraki: 'Meraki Wifi',
  },
  computerServices: {
    category: 'Computer services',
    computersPublicAccess: 'Computers available',
    computersAfterschoolCamp: 'Computer Afterschool Camp',
    additionalComputerClasses: 'Additional Computer Classes',
    esports: 'Esports Machines',
  },
  otherServices: {
    category: 'Other Services',
    generalAfterschoolCamp: 'General Afterschool Camp',
    gym: 'Gym',
  },
  yesNo: 'Available?',
  tableNoData: {
    noServices: 'No services available',
  },
  cards: {
    tableServicesIntro: 'These services are offered at this location',
    table0Intro: 'These internet services are offered at this location',
    table1Intro: 'These computer services are offered at this location',
    table2Intro: 'These other services are offered at this location',
  }
};
