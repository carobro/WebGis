export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/points_realestate_with_indicators/Points_realestate_with_indicatorsProvider'
      ]
    }
  });
}
