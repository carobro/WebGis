export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/levels_hotels_without_indicators/Levels_hotels_without_indicators_Provider'
      ]
    }
  });
}
