export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/points_hotels_without_indicators/Points_hotels_without_indicatorsProvider'
      ]
    }
  });
}
