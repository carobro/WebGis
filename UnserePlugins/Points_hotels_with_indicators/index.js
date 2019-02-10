export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/points_hotels_with_indicators/Points_hotels_with_indicatorsProvider'
      ]
    }
  });
}
