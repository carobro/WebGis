export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/timeline_hotels_with_indicators/Timeline_hotels_with_indicators_Provider'
      ]
    }
  });
}
