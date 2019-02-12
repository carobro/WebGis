export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/timeline_hotels_without_indicators/Timeline_hotels_without_indicators_Provider'
      ]
    }
  });
}
