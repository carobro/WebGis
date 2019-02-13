export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/first_item_selected_map/FirstItemProvider'
      ]
    }
  });
}
