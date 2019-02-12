export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/timeline_realestate_without_indicators/Timeline_realestate_without_indicators_Provider'
      ]
    }
  });
}
