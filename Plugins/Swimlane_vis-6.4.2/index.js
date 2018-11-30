export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/prelert_swimlane_vis/prelert_swimlane_vis'
      ]
    }
  });
}
