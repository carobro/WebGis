export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/levels_realestate_with_indicators/Levels_realestate_with_indicators_Provider'
      ]
    }
  });
}
