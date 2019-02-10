export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/points_realestate_without_indicators/Points_realestate_without_indicatorsProvider'
      ]
    }
  });
}
