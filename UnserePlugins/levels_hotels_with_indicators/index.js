export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/levels_hotels_with_indicators/Levels_hotels_with_indicators_Provider'
      ]
    }
  });
}
