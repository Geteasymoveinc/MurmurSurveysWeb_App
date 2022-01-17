/*export const MapStyle = [
  {
    elementType: "labels.text",
    stylers: [
      {
        saturation: -80,
      },
      {
        lightness: 10,
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffeb3b",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];*/


export   const MapStyle = {
  mapStyle: [
      {
      width: "100%",
      height: "100%",
    },
    {"featureType":"water","elementType":"geometry","stylers":[{"color":"#E9E9E9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#F5F5F5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#FFFFFF"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#FFFFFF"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#FFFFFF"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#FFFFFF"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#F5F5F5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#DEDEDE"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#FFFFFF"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#F2F2F2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#FEFEFE"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#FEFEFE"},{"lightness":17},{"weight":1.2}]}
  ],
};