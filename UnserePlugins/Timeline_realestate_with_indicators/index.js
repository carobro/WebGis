export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/timeline_realestate_with_indicators/Timeline_realestate_with_indicators_Provider'
      ]
    }
  });
}
