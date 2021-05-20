ymaps.ready(function() {
  let map = new ymaps.Map('map', {
    center: [59.938660, 30.323120],
    zoom: 17,
    behaviors: [],
    controls: []
  });

  let circleLayout = ymaps.templateLayoutFactory.createClass('<span class="map__icon"></span>');
  let circlePlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {iconLayout: circleLayout});
  map.geoObjects.add(circlePlacemark);
});
