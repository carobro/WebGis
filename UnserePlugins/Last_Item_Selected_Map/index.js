export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/last_item_selected_map/LastItemProvider'
      ]
    }
  });
}
