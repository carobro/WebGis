export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/items_timeline_realestate/items_timeline_realestate_Provider'
      ]
    }
  });
}
