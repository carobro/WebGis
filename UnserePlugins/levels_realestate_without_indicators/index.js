export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/levels_realestate_without_indicators/Levels_realestate_without_indicators_Provider'
      ]
    }
  });
}
